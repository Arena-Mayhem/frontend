import { formatUnits, parseUnits } from "viem";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ConfirmDeposit from "./ConfirmDeposit";
import { useDepositERC20Token, useDepositETH } from "@/lib/cartesi";

import { IoMdClose } from "react-icons/io";
import { useRkAccountModal } from "@/components/ui/button-connectwallet";
import { type DepositToken } from "@/lib/balances";
import { ADDRESSES } from "./DashboardAssets";
import { useFormattedInputHandler } from "@/lib/input";
import { ZERO_BN } from "@/lib/constants";

export default function Deposit({
  token,
  balance,
}: {
  token: DepositToken;
  balance: {
    value: bigint;
    decimals: number;
  };
}) {
  const isETHDeposit = token === "ETH";
  const isERC20Deposit = !isETHDeposit;

  const TOKEN = Object.entries(ADDRESSES).find(
    ([, { address }]) => address === token,
  )?.[1];

  const DECIMALS = TOKEN?.decimals || 18;

  const inputHandler = useFormattedInputHandler({
    decimals: DECIMALS,
  });

  const VALUE = inputHandler.formattedValue;
  const SYMBOL = TOKEN?.symbol || "ETH";
  const IMAGE = TOKEN?.imageURL || "/eth.png";

  const { openAccountModal, isConnected } = useRkAccountModal();
  const { depositETH } = useDepositETH(VALUE);
  const { depositToken, requiresApproval } = useDepositERC20Token({
    token: TOKEN?.address,
    amount: VALUE,
  });

  function handleDeposit() {
    if (!isConnected) return openAccountModal?.();

    if (VALUE <= ZERO_BN) {
      return toast.error("Invalid amount");
    }

    if (VALUE > balance.value) {
      return toast.error("Insufficient balance");
    }

    if (isETHDeposit) return depositETH?.();

    depositToken?.();
  }

  return (
    <>
      <AlertDialog
        onOpenChange={(isOpen) => {
          if (isOpen) {
            inputHandler.resetValue();
          }
        }}
      >
        <AlertDialogTrigger asChild>
          <div className=" ">
            <Button
              className="items-center justify-between gradient-button px-6 py-4 gap-2   gradient-border shadow-parriba w-[168px] text-center h-[50px]"
              variant="simple"
            >
              <p className="gradient-text-name-character">DEPOSIT</p>
              <Image
                src="/orangeplus.svg"
                alt=""
                width={1000}
                height={1000}
                className="w-[24px] h-[24px]"
              />
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col bg-arena-black justify-center">
          <AlertDialogCancel />

          <AlertDialogTitle className="text-4xl text-white">
            DEPOSIT
          </AlertDialogTitle>
          <ConfirmDeposit
            value={inputHandler.value}
            onSelectPercentage={(multiplier) => {
              const MULTIPLIER_BIG_INT = parseUnits(`${multiplier}`, DECIMALS);
              inputHandler.setValue(
                formatUnits(balance.value * MULTIPLIER_BIG_INT, DECIMALS * 2),
              );
            }}
            onChange={inputHandler.onChangeHandler}
            selectedToken={{
              name: SYMBOL,
              image: IMAGE,
              balance: `${formatUnits(balance.value, balance.decimals)} ${SYMBOL}`,
            }}
          />
          <Button
            onClick={handleDeposit}
            variant="arena-main"
            className="mt-8 py-6 text-arena-orange"
          >
            {requiresApproval && isERC20Deposit
              ? "APPROVE BALANCE"
              : "CONFIRM DEPOSIT"}
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
