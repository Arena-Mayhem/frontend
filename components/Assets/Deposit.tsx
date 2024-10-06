import { type Address, formatUnits, parseUnits } from "viem";
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

import { useRkAccountModal } from "@/components/ui/button-connectwallet";
import { useFormattedInputHandler } from "@/lib/input";
import { ZERO_BN } from "@/lib/constants";
import { useTokenData } from "@/lib/tokens";

export default function Deposit({
  token,
  balance,
}: {
  token: Address;
  balance: {
    value: bigint;
    decimals: number;
  };
}) {
  const tokenData = useTokenData(token);
  const isETHDeposit = tokenData?.symbol === "ETH";
  const isERC20Deposit = !isETHDeposit;

  const DECIMALS = tokenData?.decimals || 18;

  const inputHandler = useFormattedInputHandler({
    decimals: DECIMALS,
  });

  const VALUE = inputHandler.formattedValue;
  const SYMBOL = tokenData?.symbol || "ETH";
  const IMAGE = tokenData?.imageURL || "/eth.png";

  const { openAccountModal, isConnected } = useRkAccountModal();
  const { depositETH } = useDepositETH(VALUE);
  const { depositToken, requiresApproval } = useDepositERC20Token({
    amount: VALUE,
    token,
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
