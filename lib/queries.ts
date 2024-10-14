import type { Address } from "viem";
import { gql, useQuery } from "urql";
import { FighterData } from "./cartesi";

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

  return {
    data: (data?.notices?.edges || []).map(
      ({
        node,
      }: {
        node: {
          payload: string;
          input: {
            timestamp: string;
          };
        };
      }) => {
        const payload = payloadToJson(node?.payload);
        if (!payload) return null;

        return {
          ...payload,
          address_opponent: payload?.opponent,
          address_owner: payload?.owner,
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

  console.debug({ data });

  return {
    challenges: data
      .filter(({ fighter_hash }: any) => Boolean(fighter_hash))
      .map((props: any) => {
        // id is the challenge id for pending/accepted challenges
        // game_id is the challenge id for finished challenges

        const gameResult = data.find(
          ({ game_id }: any) => game_id === props.id,
        );

        if (!gameResult || props.status === "pending") return props;

        const { fighters, opponent_id, winner, owner_id } = gameResult;

        const winnerIndex = winner.id; // 0 or 1 as index
        const winnerAddress = winnerIndex === 0 ? owner_id : opponent_id;

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
      }) as GameData[],
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

  const challengesWon = accountChallenges.filter(
    ({ winner }) => winner?.address === FORMAT_ADDRESS,
  );

  const totalLost = accountChallenges.filter(
    ({ winner, id }) =>
      winner?.address !== FORMAT_ADDRESS &&
      !challengesWon.some((challenge) => challenge.id === id),
  ).length;

  return {
    totalWon: challengesWon.length,
    challenges: accountChallenges,
    totalLost,
  };
};
