"use client";

import type { SwordTypes } from "@/lib/types";
import type { Token } from "@/lib/atoms";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { sha256, toBytes, zeroAddress } from "viem";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";
import { Button } from "@/components/ui/button";
import { useCreateChallenge } from "@/lib/cartesi";
import { Choosepj } from "./Choosepj";
import { Cancel } from "@radix-ui/react-alert-dialog";

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
  token: Token;
  amount: bigint;
}) {
  console.debug({ token, amount });
  const { createChallenge } = useCreateChallenge();

  const [name, setName] = useState("Leonardo");
  const [weapon, setWeapon] = useState<SwordTypes>("sword");
  const [fighter, setFighter] = useState({
    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
  });

  const setPartialFighter = (config: Partial<typeof fighter>) =>
    setFighter((prev) => ({ ...prev, ...config }));

  function handleCreateChallenge() {
    if (!token) return toast.error("Select a token");
    if (!amount) return toast.error("Enter a valid amount");

    const fighterHash = sha256(
      toBytes(
        [name, weapon, fighter.hp, fighter.atk, fighter.def, fighter.spd].join(
          "-",
        ),
      ),
      "hex",
    );

    createChallenge({
      amount,
      isETHChallenge: token.address === zeroAddress,
      token: token.address,
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
        <Choosepj
          onChangeAtack={(atk) =>
            setPartialFighter({
              atk,
            })
          }
          onChangeDefense={(def) =>
            setPartialFighter({
              def,
            })
          }
          onChangeHealth={(hp) =>
            setPartialFighter({
              hp,
            })
          }
          onChangeSpeed={(spd) =>
            setPartialFighter({
              spd,
            })
          }
        />
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
