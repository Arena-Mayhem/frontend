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
import ConfirmDeposit from "./ConfirmDeposit";

import { useRkAccountModal } from "@/components/ui/button-connectwallet";
import { useAccountDeposits } from "@/lib/balances";
import { useFormattedInputHandler } from "@/lib/input";
import { ZERO_BN } from "@/lib/constants";
import { useAddCartesiInput } from "@/lib/cartesi";
import { useAccount } from "wagmi";
import { useTokenData } from "@/lib/tokens";

export default function Withdraw({ token }: { token: Address }) {
  const { address: account } = useAccount();
  const tokenData = useTokenData(token);

  const isETHDeposit = tokenData?.symbol === "ETH";
  const isERC20Deposit = !isETHDeposit;

  const DECIMALS = tokenData?.decimals || 18;

  const inputHandler = useFormattedInputHandler({
    decimals: DECIMALS,
  });

  const { addCartesiInput } = useAddCartesiInput();

  const { data: deposits } = useAccountDeposits(token);
  const VALUE = inputHandler.formattedValue;
  const SYMBOL = tokenData?.symbol || "ETH";
  const IMAGE = tokenData?.imageURL || "/eth.png";

  const DEPOSIT_BALANCE = deposits?.amount || ZERO_BN;

  const { openAccountModal, isConnected } = useRkAccountModal();

  function handleDeposit() {
    if (!isConnected) return openAccountModal?.();

    if (VALUE <= ZERO_BN) {
      return toast.error("Invalid amount");
    }

    addCartesiInput({
      method: isERC20Deposit ? "erc20_withdraw" : "ether_withdraw",
      from: account,
      erc20: isERC20Deposit ? token : null,
      amount: VALUE.toString(),
    });
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
          <Button variant="simple">
            <p className="gradient-text-name-character hover hover:gradient-text-defeat">
              WITHDRAW
            </p>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col bg-arena-black justify-center">
          <AlertDialogCancel />

          <AlertDialogTitle className="text-4xl text-white">
            WITHDRAW
          </AlertDialogTitle>
          <ConfirmDeposit
            value={inputHandler.value}
            onSelectPercentage={(multiplier) => {
              const MULTIPLIER_BIG_INT = parseUnits(`${multiplier}`, DECIMALS);

              inputHandler.setValue(
                formatUnits(DEPOSIT_BALANCE * MULTIPLIER_BIG_INT, DECIMALS * 2),
              );
            }}
            onChange={inputHandler.onChangeHandler}
            selectedToken={{
              name: SYMBOL,
              image: IMAGE,
              balance: `${formatUnits(DEPOSIT_BALANCE, DECIMALS)} ${SYMBOL}`,
            }}
          />
          <Button
            onClick={handleDeposit}
            variant="arena-main"
            className="mt-8 py-6 text-arena-orange"
          >
            WITHDRAW {SYMBOL}
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
