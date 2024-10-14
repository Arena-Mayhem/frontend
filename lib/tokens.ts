import { type Address, zeroAddress } from "viem";
import { type Token, useCustomTokens } from "./atoms";
import useSWR from "swr";
import { ONE_SECOND_IN_MS } from "./constants";
import { useImageForAddress } from "./images";

export const TOKEN_ETH = {
  imageURL: "/eth.png",
  address: zeroAddress,
  decimals: 18,
  symbol: "ETH",
};

const TOKENS: Array<Token> = [
  {
    imageURL: "/usdc.png",
    address: "0x809d550fca64d94Bd9F66E60752A544199cfAC3D",
    decimals: 6,
    symbol: "USDC",
  },
  {
    imageURL: "/dai.png",
    address: "0x36C02dA8a0983159322a80FFE9F24b1acfF8B570",
    decimals: 18,
    symbol: "DAI",
  },
  TOKEN_ETH,
];

export const useTokenList = (): Array<Token> => {
  const [customTokens] = useCustomTokens();

  return [...customTokens, ...TOKENS];
};

export const useTokenData = (address?: Address | null) => {
  const tokens = useTokenList();
  const TOKEN_ADDRESS = address === null ? zeroAddress : address;

  return tokens.find(({ address }) => address === TOKEN_ADDRESS) || null;
};

export const useTrustWalletData = () => {
  return useSWR<
    Array<{
      name: string;
      symbol: string;
      logoURI: string;
    }>
  >("trustwallet-data", {
    fetcher: async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/tokenlist.json",
      );

      return (await response.json())?.tokens || [];
    },
    keepPreviousData: true,
    dedupingInterval: ONE_SECOND_IN_MS * 60 * 60, // 1 hour
  });
};

export const useTokenImage = (token: Token | null) => {
  const { data: tokens = [] } = useTrustWalletData();

  const twData = tokens.find(
    (twToken) =>
      twToken.symbol?.toLocaleLowerCase() ===
      token?.symbol?.toLocaleLowerCase(),
  );

  const { imageURL } = useImageForAddress({
    address: token?.address,
  });

  return {
    imageURL: token?.imageURL || twData?.logoURI || imageURL,
    // First we try to get the image from the token, then from TrustWallet, then from the address
  };
};
