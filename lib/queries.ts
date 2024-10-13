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
    data: (data?.notices?.edges || []).map(({ node }: { node: any }) =>
      payloadToJson(node?.payload),
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

  return {
    challenges: data.filter(({ fighter_hash }: any) =>
      Boolean(fighter_hash),
    ) as GameData[],
  };
};
