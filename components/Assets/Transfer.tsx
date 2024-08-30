import { formatUnits, isAddress, parseUnits } from "viem";
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

import { IoMdClose } from "react-icons/io";
import { useRkAccountModal } from "@/components/ui/button-connectwallet";
import { useAccountDeposits, type DepositToken } from "@/lib/balances";
import { ADDRESSES } from "./DashboardAssets";
import { useFormattedInputHandler } from "@/lib/input";
import { ZERO_BN } from "@/lib/constants";
import { useAddCartesiInput } from "@/lib/cartesi";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function Transfer({ token }: { token: DepositToken }) {
  const [recipient, setRecipient] = useState("");
  const { address: account } = useAccount();
  const isETHTransaction = token === "ETH";
  const isERC20Transaction = !isETHTransaction;

  const TOKEN = Object.entries(ADDRESSES).find(
    ([, { address }]) => address === token,
  )?.[1];

  const DECIMALS = TOKEN?.decimals || 18;

  const inputHandler = useFormattedInputHandler({
    decimals: DECIMALS,
  });

  const { addCartesiInput } = useAddCartesiInput();

  const { data: deposits } = useAccountDeposits(token);
  const VALUE = inputHandler.formattedValue;
  const SYMBOL = TOKEN?.symbol || "ETH";
  const IMAGE = TOKEN?.imageURL || "/eth.png";

  const DEPOSIT_BALANCE = deposits?.amount || ZERO_BN;

  const { openAccountModal, isConnected } = useRkAccountModal();

  function handleDeposit() {
    if (!isConnected) return openAccountModal?.();

    if (!(recipient && isAddress(recipient))) {
      return toast.error("Invalid address");
    }

    if (VALUE <= ZERO_BN) {
      return toast.error("Invalid amount");
    }

    addCartesiInput({
      method: isERC20Transaction ? "erc20_transfer" : "ether_transfer",
      from: account,
      to: recipient,
      erc20: isERC20Transaction ? TOKEN?.address : null,
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
              TRANSFER
            </p>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col bg-arena-black justify-center">
          <AlertDialogCancel />

          <AlertDialogTitle className="text-4xl text-white">
            TRANSFER
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

          <p className="text-base text-white mt-4">DESTINATION ADDRESS</p>

          <label className="flex items-center w-full shadow-parriba gradient-border bg-arena-orange/20 backdrop-blur-sm">
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="flex-grow outline-none w-full px-4 py-4 font-light text-white bg-transparent "
              placeholder="payal.eth"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              type="text"
            />
          </label>

          <Button
            onClick={handleDeposit}
            variant="arena-main"
            className="mt-2 py-6 text-arena-orange"
          >
            TRANSFER {SYMBOL}
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
