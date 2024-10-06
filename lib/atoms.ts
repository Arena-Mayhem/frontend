import type { Address } from "viem";

import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai/react";

export type Token = {
  decimals: number;
  symbol: string;
  imageURL?: string;
  address: Address;
};

export const atomCustomTokens = atomWithStorage<Token[]>(
  "cartesi.customTokens",
  [],
);

export const useCustomTokens = () => useAtom(atomCustomTokens);
