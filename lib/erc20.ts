import { formatEther, erc20Abi, type Address, formatUnits } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { ONE_SECOND_IN_MS, ZERO_BN } from "./constants";
import { toast } from "sonner";
import { noOp } from "./utils";
import { useTokenData } from "./tokens";

export const useErc20Approve = (
  tokenAddress: Address,
  spender: Address,
  amount: bigint,
) => {
  const { writeContractAsync, ...state } = useWriteContract();

  return {
    ...state,
    approve: () => {
      const id = toast.loading("Approving...", {
        duration: 3_000,
      });

      writeContractAsync({
        abi: erc20Abi,
        functionName: "approve",
        address: tokenAddress,
        args: [spender, amount],
      })
        .then(() => toast.success("Success!"))
        .catch(noOp)
        .finally(() => toast.dismiss(id));
    },
  };
};

export const useErc20Allowance = (
  tokenAddress: Address,
  owner: Address | "connected",
  spender: Address | "connected",
) => {
  const { address } = useAccount();
  const OWNER: any = owner === "connected" ? address : owner;
  const SPENDER: any = spender === "connected" ? address : spender;

  const TOKEN = useTokenData(tokenAddress);

  const balance = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    query: {
      enabled: Boolean(owner && spender && tokenAddress),
      refetchInterval: ONE_SECOND_IN_MS * 5, // 5 seconds
    },
    functionName: "allowance",
    args: [OWNER, SPENDER],
    scopeKey: `allowance-${tokenAddress}-${OWNER}-${SPENDER}`,
  });

  return {
    ...balance,
    allowance: Number(
      formatUnits(balance.data ?? ZERO_BN, TOKEN?.decimals || 18),
    ),
  };
};

export const useWalletBalance = (token: Address) => {
  const tokenData = useTokenData(token);

  const isETHDeposit = tokenData?.symbol === "ETH";
  const isERC20Deposit = !isETHDeposit;

  const { address: account } = useAccount();

  const ethBalance = useBalance({
    address: account,
    query: {
      refetchInterval: 5000,
      enabled: Boolean(account && isETHDeposit),
    },
  });

  const erc20Balance = useReadContract({
    abi: erc20Abi,
    functionName: "balanceOf",
    query: {
      enabled: Boolean(account && isERC20Deposit),
      refetchInterval: 5000,
    },
    address: token as Address,
    args: [account!],
  });

  const value = isETHDeposit ? ethBalance?.data?.value : erc20Balance?.data;

  return {
    value: value || ZERO_BN,
  };
};
