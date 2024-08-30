import type { Address } from "viem";
import useSWR from "swr";
import { useAccount } from "wagmi";
import { ONE_SECOND_IN_MS } from "./constants";

export const BASE_URL_INSPECT = "http://localhost:8080";
export type DepositToken = Address | "ETH";

export const useAccountDeposits = (token: DepositToken) => {
  const { address: account, isConnected } = useAccount();
  const isETHToken = token === "ETH";
  const isERC20Token = token !== "ETH";

  const ethResult = useSWR(
    isConnected && isETHToken
      ? `${BASE_URL_INSPECT}/inspect/balance/ether/${account}`
      : null,
    {
      fetcher: async (key: string | null) => {
        if (!key) return null;
        // Early exit if key is falsy

        const res = await fetch(key);
        const payload = (await res.json()) as {
          status?: string;
          reports?: Array<{
            payload: string;
          }>;
        };

        const data = payload?.reports?.[0].payload;

        if (data) {
          const result = JSON.parse(
            Buffer.from(data.substr(2), "hex").toString("utf8"),
          );

          return result;
        }

        return null;
      },
      refreshInterval: ONE_SECOND_IN_MS * 5, // 5 seconds
    },
  );

  const erc20Result = useSWR(
    isConnected && isERC20Token
      ? `${BASE_URL_INSPECT}/inspect/balance/erc20/${account}/${token}`
      : null,
    {
      fetcher: async (key: string | null) => {
        if (!key) return null;
        // Early exit if key is falsy

        const res = await fetch(key);
        const payload = (await res.json()) as {
          status?: string;
          reports?: Array<{
            payload: string;
          }>;
        };

        const data = payload?.reports?.[0].payload;

        if (data) {
          return JSON.parse(
            Buffer.from(data.substr(2), "hex").toString("utf8"),
          );
        }

        return null;
      },
      refreshInterval: ONE_SECOND_IN_MS * 5, // 5 seconds
    },
  );

  const balance = isETHToken ? ethResult : erc20Result;
  const data = balance?.data || {};

  return {
    ...balance,
    data: data
      ? {
          amount: BigInt(data.amount ?? 0),
          token_type: data.token_type as "erc20" | "ether",
        }
      : null,
  };
};
