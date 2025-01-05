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
//to see these changes in action----------
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

//mock data---------------------------------------------------------------------------------------
const gameDataArray: GameData[] = [
  {
    id: 1,
    amount: "100",
    fighter_hash: "hash1",
    players: [
      { address: "0x123", name: "Warrior", weapon: "Sword", hp: 100, atk: 80, def: 70, spd: 60 },
      { address: "0x456", name: "Mage", weapon: "Staff", hp: 60, atk: 90, def: 50, spd: 70 }
    ],
    address_opponent: "0x789",
    address_owner: "0x123",
    timestamp: 1633036800,
    winner: { address: "0x123", name: "Warrior", weapon: "Sword", hp: 100, atk: 80, def: 70, spd: 60 },
    status: "finished",
    token: "0xabc",
    input: { fighterMetadata: { name: "Warrior", imageURL: "/wizard.png" } }
  },
  {
    id: 2,
    amount: "200",
    fighter_hash: "hash2",
    players: [
      { address: "0x789", name: "Archer", weapon: "Bow", hp: 80, atk: 70, def: 60, spd: 90 },
      { address: "0xabc", name: "Mage", weapon: "Staff", hp: 60, atk: 90, def: 50, spd: 70 }
    ],
    address_opponent: "0xdef",
    address_owner: "0x789",
    timestamp: 1633123200,
    winner: { address: "0x789", name: "Archer", weapon: "Bow", hp: 80, atk: 70, def: 60, spd: 90 },
    status: "accepted",
    token: "0xdef",
    input: { fighterMetadata: { name: "Archer", imageURL: "/wizard.png" } }
  },
  {
    id: 3,
    amount: "300",
    fighter_hash: "hash3",
    players: [
      { address: "0xghi", name: "Mage", weapon: "Staff", hp: 60, atk: 90, def: 50, spd: 70 },
      { address: "0xjkl", name: "Warrior", weapon: "Sword", hp: 100, atk: 80, def: 70, spd: 60 }
    ],
    address_opponent: "0xjkl",
    address_owner: "0xghi",
    timestamp: 1633209600,
    winner: { address: "0xghi", name: "Mage", weapon: "Staff", hp: 60, atk: 90, def: 50, spd: 70 },
    status: "pending",
    token: "0xghi",
    input: { fighterMetadata: { name: "Mage", imageURL: "/wizard.png" } }
  },
  {
    id: 4,
    amount: "150",
    fighter_hash: "hash4",
    players: [
      { address: "0x9e8c9A41d22c6840104Bdc9B68B718da1C462955", name: "Troll1", weapon: "Staff", hp: 120, atk: 90, def: 50, spd: 70 },
      { address: "0xdef", name: "Troll2", weapon: "Sword", hp: 100, atk: 80, def: 70, spd: 60 }
    ],
    address_opponent: "0xdef",
    address_owner: "0x9e8c9A41d22c6840104Bdc9B68B718da1C462955",
    timestamp: Date.now() - 1800000,
    winner: { address: "0x9e8c9A41d22c6840104Bdc9B68B718da1C462955", name: "Troll1", weapon: "Staff", hp: 120, atk: 90, def: 50, spd: 70 },
    status: "finished",
    token: "0xabc",
    input: { fighterMetadata: { name: "Troll1", imageURL: "/giant_troll.png" } }
  }
];
//moked data---------------------------------------------------------------------------------------
  return {
    challenges: gameDataArray,};
};
//moked data---------------------------------------------------------------------------------------

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

