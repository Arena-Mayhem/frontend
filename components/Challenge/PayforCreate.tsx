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

export default function PayforCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const { heroes } = useHeroes();
  const isHeroCreated = heroes.length > 0;

  const TRIGGER = (
    <Button variant="simple" className="pt-3.5 text-sm md:text-base text-yellow-400 md:text-white flex flex-row items-center justify-end w-full md:w-auto">
      <div className="flex">
      <span className="block md:hidden">New Challenge</span>
      <span className="hidden md:block">Create New Challenge</span>
      <Image
        src="/plus.svg"
        alt=""
        width={1000}
        height={1000}
        className="w-4 h-4 md:w-6 md:h-6"
      />
      </div>
    </Button>
  );

  return isHeroCreated ? (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{TRIGGER}</AlertDialogTrigger>
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
    <CreateNew trigger={TRIGGER} />
  );
}
