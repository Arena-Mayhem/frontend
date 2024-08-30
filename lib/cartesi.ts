import { type Address, bytesToHex, parseAbi, toBytes } from "viem";
import { useWriteContract } from "wagmi";
import { useErc20Allowance, useErc20Approve } from "./erc20";
import { ONE_SECOND_IN_MS, ZERO_BN } from "./constants";
import useSWR from "swr";
import { BASE_URL_INSPECT } from "./balances";

export const ADDRESSES_INPUT_BOX = "0x59b22D57D4f067708AB0c00552767405926dc768";
export const ADDRESSES_DAPP = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e";
export const ADDRESSES_PORTAL_ETHER =
  "0xFfdbe43d4c855BF7e0f105c400A50857f53AB044";
export const ADDRESSES_PORTAL_ERC20 =
  "0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB";

const ABI = parseAbi([
  "function addInput(address _dapp, bytes _input) external returns (bytes32)",
  "function depositEther(address _dapp, bytes _execLayerData) external payable",
  "function depositERC20Tokens(address _token, address _dapp, uint256 _amount, bytes _execLayerData) external",
]);

export const useDepositETH = (amount: bigint) => {
  const { writeContract, ...write } = useWriteContract();

  return {
    ...write,
    depositETH: async () => {
      await writeContract({
        abi: ABI,
        address: ADDRESSES_PORTAL_ETHER,
        args: [ADDRESSES_DAPP, "0x0"],
        functionName: "depositEther",
        value: amount,
      });
    },
  };
};

export const useDepositERC20Token = ({
  token,
  amount,
}: {
  token?: Address;
  amount: bigint;
}) => {
  const { writeContract, ...write } = useWriteContract();

  const { data: rawAllowance = ZERO_BN } = useErc20Allowance(
    token!,
    "connected",
    ADDRESSES_PORTAL_ERC20,
  );

  const requiresApproval = rawAllowance < amount;

  const { approve } = useErc20Approve(token!, ADDRESSES_PORTAL_ERC20, amount);

  return {
    ...write,
    requiresApproval,
    depositToken: async () => {
      if (!token) return;

      if (requiresApproval) {
        await approve();
      } else {
        await writeContract({
          abi: ABI,
          address: ADDRESSES_PORTAL_ERC20,
          // address _token, address _dapp, uint256 _amount, bytes _execLayerData
          args: [token, ADDRESSES_DAPP, amount, "0x0"],
          functionName: "depositERC20Tokens",
        });
      }
    },
  };
};

export const useAddCartesiInput = () => {
  const { writeContract, error, ...write } = useWriteContract();

  console.debug({ error });
  return {
    ...write,
    addCartesiInput: async (
      payload: {
        method:
          | "accept_challenge"
          | "ether_withdraw"
          | "erc20_withdraw"
          | "ether_transfer"
          | "erc20_transfer"
          | "create_challenge";
      } & Record<string, any>,
    ) => {
      console.debug({ payload });

      await writeContract({
        abi: ABI,
        address: ADDRESSES_INPUT_BOX,
        args: [ADDRESSES_DAPP, bytesToHex(toBytes(JSON.stringify(payload)))],
        functionName: "addInput",
      });
    },
  };
};

export const useCreateChallenge = () => {
  const { addCartesiInput } = useAddCartesiInput();

  return {
    createChallenge: async ({
      fighterHash,
      amount,
      token,
    }: {
      fighterHash: string;
      token: Address;
      amount: bigint;
    }) => {
      await addCartesiInput({
        method: "create_challenge",
        fighter_hash: fighterHash,
        token,
        amount: amount.toString(),
      });
    },
  };
};

export const useBattleHistory = () => {
  return useSWR(`${BASE_URL_INSPECT}/inspect/battles`, {
    fetcher: async (key: string) => {
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
        return JSON.parse(Buffer.from(data.substr(2), "hex").toString("utf8"));
      }

      return null;
    },
    refreshInterval: ONE_SECOND_IN_MS * 5, // 5 seconds
  });
};
