import { type Address, zeroAddress } from "viem";
import { type Token, useCustomTokens } from "./atoms";

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

export const useTokenData = (address: Address) => {
  const tokens = useTokenList();
  return tokens.find((token) => token.address === address) || null;
};
