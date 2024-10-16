"use client";

import type { SwordTypes } from "@/lib/types";
import type { Token } from "@/lib/atoms";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { zeroAddress } from "viem";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";
import { Button } from "@/components/ui/button";
import { FighterData, useCreateChallenge } from "@/lib/cartesi";
import { Choosepj } from "./Choosepj";
import { Cancel } from "@radix-ui/react-alert-dialog";
import { generateFighterHash, useHeroData, useHeroes } from "@/lib/heroes";

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
  selectedFighterHash,
}: {
  token: Token;
  amount: bigint;
  selectedFighterHash?: string;
}) {
  const { data: externalSelectedHero } = useHeroData(selectedFighterHash || "");

  const { appendHero } = useHeroes();
  const { createChallenge } = useCreateChallenge();

  const [name, setName] = useState("Leonardo");
  const [weapon, setWeapon] = useState<SwordTypes>("sword");
  const [fighter, setFighter] = useState({
    spd: 0,
    atk: 0,
    def: 0,
    hp: 0,
  });

  const setPartialFighter = (config: Partial<typeof fighter>) =>
    setFighter((prev) => ({ ...prev, ...config }));

  function handleCreateChallenge() {
    if (!token) return toast.error("Select a token");
    if (!amount) return toast.error("Enter a valid amount");

    const LOCAL_FIGHTER = {
      atk: fighter.atk,
      def: fighter.def,
      hp: fighter.hp,
      spd: fighter.spd,
      name,
      weapon,
    };

    const FIGHTER = externalSelectedHero || LOCAL_FIGHTER;

    if (!validateHeroConfig(FIGHTER)) return;

    if (!selectedFighterHash) {
      // Append the hero to the list of heroes
      appendHero(FIGHTER);
    }

    createChallenge({
      amount,
      isETHChallenge: token.address === zeroAddress,
      token: token.address,
      fighterHash: generateFighterHash(FIGHTER),
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
            type="button"
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

/**
 * Evalute if the hero configuration is valid
 * @returns true if the configuration is valid
 */

export function validateHeroConfig(
  fighter: Omit<FighterData, "name" | "weapon">,
) {
  const formattedFighter: typeof fighter = {
    atk: fighter.atk || 0,
    def: fighter.def || 0,
    hp: fighter.hp || 0,
    spd: fighter.spd || 0,
  };

  if (Object.values(formattedFighter).some((v) => v < 1)) {
    return toast.error("Value should be greater than 0"), false;
  }

  if (Object.values(formattedFighter).some((v) => v > 40)) {
    return toast.error("Single values should be less than 40"), false;
  }

  if (Object.values(formattedFighter).reduce((a, b) => a + b, 0) > 100) {
    return toast.error("Sum of values should be less than 100"), false;
  }

  return true;
}
