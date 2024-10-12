import type { Address } from "viem";
import { gql, useQuery } from "urql";

export type GameData = {
  amount: string;
  fighter_hash: string;
  id: number;
  opponent: Address | null;
  owner: Address;
  status: "pending" | "accepted";
  token: Address | null;
};

export const QUERY_NOTICES = gql`
  {
    notices {
      edges {
        node {
          index
          payload
        }
      }
    }
  }
`;

export const useNotices = () => {
  const [result, revalidate] = useQuery({
    query: QUERY_NOTICES,
  });

  return {
    ...result,
    isLoading: result.fetching,
    revalidate,
  };
};

export const useChallenges = () => {
  const { data = [] } = useNotices();

  return {
    challenges: (data?.notices?.edges || [])
      .map(({ node }: { node: { payload?: string } }) => {
        const RAW_JSON = Buffer.from(
          node?.payload?.substr(2) || "",
          "hex",
        ).toString("utf8");
        try {
          const data = JSON.parse(RAW_JSON);
          if (data.fighter_hash) return data;
        } catch (e) {
          // no-op
        }

        return null;
      })
      .filter((challenge: any) => Boolean(challenge)) as Array<GameData>,
  };
};
