import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import SelectChamp, {
  ActionContinue,
} from "@/components/challenges/SelectChamp";

import Bet from "@/components/challenges/Bet";

export default function CreateNewChallenge({
  selectedFighterHash,
}: {
  selectedFighterHash?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="arena-main"
          className="gradient-button px-6 py-6 gap-2 text-arena-orange text-base"
        >
          New Challenge
          <Image
            src="/orangeplus.svg"
            alt=""
            width={1000}
            height={1000}
            className="w-[24px] h-[24px]"
          />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex items-center flex-col bg-arena-black justify-center">
        <AlertDialogCancel />
        <AlertDialogTitle className="text-5xl gradient-text-name-character text-center">
          Create Challenge
        </AlertDialogTitle>

        <Bet>
          {({ isValidBet, token, value }) => {
            if (isValidBet) {
              return (
                <SelectChamp
                  selectedFighterHash={selectedFighterHash}
                  onChallengeCreated={() => {
                    setIsOpen(false);
                    toast.success("Challenge created");
                  }}
                  amount={value}
                  token={token}
                />
              );
            }
            return (
              <ActionContinue
                onClick={() => {
                  toast.error("Enter a valid amount");
                }}
              />
            );
          }}
        </Bet>
      </AlertDialogContent>
    </AlertDialog>
  );
}
