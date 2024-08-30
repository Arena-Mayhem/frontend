"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";
import { Button } from "@/components/ui/button";
import { Choosepj } from "./Choosepj";
import Link from "next/link";
import { Cancel } from "@radix-ui/react-alert-dialog";
import { useCreateChallenge } from "@/lib/cartesi";
import { sha256, toBytes, type Address } from "viem";
import { toast } from "sonner";

export const ActionContinue = ({ onClick }: { onClick?: any }) => (
  <div className="w-full justify-end py-8 px-4 flex">
    <Button
      variant="simple"
      onClick={onClick}
      className="px-10 py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
    >
      CONTINUE
    </Button>
  </div>
);

export default function SelectChamp({
  token,
  amount,
}: {
  token: Address;
  amount: bigint;
}) {
  const { createChallenge } = useCreateChallenge();

  function handleCreateChallenge() {
    if (!token) return toast.error("Select a token");
    if (!amount) return toast.error("Enter a valid amount");

    const fighter = {
      name: "fighter",
      weapon: "weapon",
      hp: 100,
      atk: 10,
      def: 10,
      spd: 10,
    };

    const fighterHash = sha256(
      toBytes(
        [
          fighter.name,
          fighter.weapon,
          fighter.hp,
          fighter.atk,
          fighter.def,
          fighter.spd,
        ].join("-"),
      ),
      "hex",
    );

    createChallenge({
      amount,
      token,
      fighterHash,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ActionContinue />
      </AlertDialogTrigger>
      <AlertDialogContent className="flex  bg-arena-black flex-col ">
        <AlertDialogCancel />
        <AlertDialogTitle className="gradient-text-name-character text-5xl">
          Select your warrior
        </AlertDialogTitle>
        <Choosepj />
        <div className="flex gap-3   flex-row justify-end items-center">
          <Cancel asChild>
            <Button asChild className="w-56 py-5" variant="arena-main">
              <Link className="text-arena-orange " href="/challenge">
                go back
              </Link>
            </Button>
          </Cancel>
          <Button
            onClick={handleCreateChallenge}
            asChild
            className="w-56 py-5"
            variant="arena-main"
          >
            <Link className="text-arena-orange" href="/challenge">
              Create Challenge
            </Link>
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
