import type { Address } from "viem";
import { gql, useQuery } from "urql";
import { FighterData } from "./cartesi";
import useSWR from "swr";

export type GameData = {
  id: number;
  amount: string;
  fighter_hash: string;
  players?: Array<FighterData & { address: Address }>;
  address_opponent: Address | null;
  address_owner: Address;
  timestamp: number;
  winner?: FighterData & { address: Address };
  status: "pending" | "accepted" | "finished";
  token: Address | null;
  input?: { fighterMetadata?: { name: string; imageURL: string } };
};

export const QUERY_NOTICES = gql`
  {
    notices {
      edges {
        node {
          payload
          index
          input {
            timestamp
            payload
          }
        }
      }
    }
  }
`;

export const QUERY_REPORTS = gql`
  {
    reports {
      edges {
        node {
          payload
          index
        }
      }
    }
  }
`;

const payloadToJson = (payload?: string) => {
  try {
    const RAW_JSON = Buffer.from((payload || "").substr(2), "hex").toString(
      "utf8",
    );
    return JSON.parse(RAW_JSON);
  } catch (e) {
    return null;
  }
};

export const useNotices = () => {
  const [{ error, fetching: isLoading, data }, revalidate] = useQuery({
    query: QUERY_NOTICES,
  });

  useSWR("notices.list", {
    refreshInterval: 7_500,
    fetcher: () => {
      if (isLoading) return;
      revalidate({ requestPolicy: "network-only" });
    },
  });

  return {
    data: (data?.notices?.edges || []).map(
      ({
        node,
      }: {
        node: {
          payload: string;
          input: {
            timestamp: string;
            payload: string;
          };
        };
      }) => {
        const payload = payloadToJson(node?.payload);
        if (!payload) return null;

        return {
          ...payload,
          address_opponent: payload?.opponent,
          address_owner: payload?.owner,
          input: payloadToJson(node?.input?.payload),
          timestamp: Number(node?.input?.timestamp || 0) * 1_000,
        };
      },
    ),
    error,
    isLoading,
    revalidate,
  };
};

export const useReports = () => {
  const [{ error, fetching: isLoading, data }, revalidate] = useQuery({
    query: QUERY_REPORTS,
  });

  return {
    data: (data?.reports?.edges || []).map(({ node }: { node: any }) =>
      payloadToJson(node?.payload),
    ),
    error,
    isLoading,
    revalidate,
  };
};

export const useChallenges = () => {
  const { data = [] } = useNotices();

  const rawStates = data
    .filter(({ fighter_hash }: any) => Boolean(fighter_hash))
    .map((props: any) => {
      // id is the challenge id for pending/accepted challenges
      // game_id is the challenge id for finished challenges

      const gameResult = data.find(({ game_id }: any) => game_id === props.id);

      if (!gameResult || props.status === "pending") return props;

      const { fighters, opponent_id, winner, owner_id } = gameResult;

      const winnerIndex = winner.id; // 0 or 1 as index

      const PLAYER1 = fighters[0];
      const PLAYER2 = fighters[1];

      const players = [
        {
          ...PLAYER1,
          address: owner_id,
        },
        {
          ...PLAYER2,
          address: opponent_id,
        },
      ];

      return {
        ...props,
        players,
        status: "finished",
        winner: players[winnerIndex],
      };
    }) as GameData[];

  const mergedStates = rawStates.map(({ id }, _, states) => {
    const findForState = (status: GameData["status"]) => {
      return states.find(
        // Element status, Element id
        ({ status: es, id: eid }) => es === status && eid === id,
      );
    };

    const finishedState = findForState("finished");
    const acceptedState = findForState("accepted");
    const pendingState = findForState("pending");

    return {
      // We merge all the states into one
      ...pendingState,
      ...acceptedState,
      ...finishedState,
      input: {
        ...pendingState?.input,
        ...acceptedState?.input,
        ...finishedState?.input,
      },
    } as GameData;
  });

  return {
    challenges: mergedStates.filter(
      // Filter out duplicates
      ({ id }, index, states) =>
        states.findIndex(({ id: eid }) => eid === id) === index,
    ),
  };
};

export const useAcceptedChallenges = (address: Address) => {
  const FORMAT_ADDRESS = address?.toLocaleLowerCase();
  const { challenges } = useChallenges();

  const accountChallenges = challenges.filter(
    ({ address_owner, address_opponent }) =>
      [address_owner, address_opponent].includes(
        (FORMAT_ADDRESS as any) || " ",
      ),
  );

  const finishedChallenges = accountChallenges.filter(
    ({ status }) => status === "finished",
  );

  const challengesWon = finishedChallenges.filter(
    ({ winner }) => winner?.address === FORMAT_ADDRESS,
  );

  const totalLost = finishedChallenges.length - challengesWon.length;

  return {
    totalWon: challengesWon.length,
    challenges: accountChallenges,
    totalLost,
  };
};
