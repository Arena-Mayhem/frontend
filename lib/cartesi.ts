import { type Address, bytesToHex, parseAbi, toBytes } from "viem";
import { useWriteContract } from "wagmi";
import { useErc20Allowance, useErc20Approve } from "./erc20";
import { ZERO_BN } from "./constants";

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

export type FighterData = {
  name: string;
  weapon: string;
  imageURL?: string;
  hp: number;
  atk: number;
  def: number;
  spd: number;
};

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
          | "erc20_transfer"
          | "ether_transfer"
          | "start_match"
          | "create_challenge"
          | "create_challenge_eth";
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
      isETHChallenge,
      fighterHash,
      fighterMetadata,
      amount,
      token,
    }: {
      fighterHash: string;
      fighterMetadata: {
        name?: string;
        imageURL?: string;
      };
      token: Address;
      amount: bigint;
      isETHChallenge?: boolean;
    }) => {
      await addCartesiInput({
        method: isETHChallenge ? "create_challenge_eth" : "create_challenge",
        fighter_hash: fighterHash,
        fighterMetadata: {
          name: fighterMetadata.name || "Nameless Hero",
          imageURL: fighterMetadata.imageURL || "/shaman.png",
        },
        token: isETHChallenge ? null : token,
        amount: amount.toString(),
      });
    },
  };
};

export const useJoinChallenge = () => {
  const { addCartesiInput } = useAddCartesiInput();

  return {
    joinChallenge: async ({
      challenge_id,
      fighter,
    }: {
      fighter: FighterData;
      challenge_id: number;
    }) => {
      await addCartesiInput({
        method: "accept_challenge",
        challenge_id,
        fighter,
      });
    },
  };
};

export const useStartMatch = () => {
  const { addCartesiInput } = useAddCartesiInput();

  return {
    startMatch: async ({
      challenge_id,
      fighter,
    }: {
      fighter: FighterData;
      challenge_id: number;
    }) => {
      await addCartesiInput({
        method: "start_match",
        challenge_id,
        fighter,
      });
    },
  };
};
