import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Bet from "./Bet";

import { useHeroes } from "@/lib/heroes";
import CreateNew from "@/components/Character/CreateNew";
import SelectChamp, { ActionContinue } from "./SelectChamp";

const TRIGGER_CREATE_NEW_CHALLENGE = (
  <Button
    variant="simple"
    className="pt-3.5 text-sm md:text-base text-yellow-400 md:text-white flex flex-row items-center justify-end w-full md:w-auto"
  >
    <div className="flex">
      <span className="block md:hidden">New Challenge</span>
      <span className="hidden md:block">Create New Challenge</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 md:w-6 md:h-6"
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </Button>
);

export default function PayforCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const { heroes } = useHeroes();
  const isHeroCreated = heroes.length > 0;

  return isHeroCreated ? (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {TRIGGER_CREATE_NEW_CHALLENGE}
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
                  toast.error("Inter a valid amount");
                }}
              />
            );
          }}
        </Bet>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <CreateNew trigger={TRIGGER_CREATE_NEW_CHALLENGE} />
  );
}
