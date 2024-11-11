"use client";

import type { Token } from "@/lib/atoms";

import { useEffect, useState } from "react";
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
import HeroSelection from "./HeroSelection";
import { Cancel } from "@radix-ui/react-alert-dialog";
import { generateFighterHash, useHeroData } from "@/lib/heroes";
import { cn } from "@/lib/utils";

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
  onChallengeCreated,
}: {
  token: Token;
  amount: bigint;
  selectedFighterHash?: string;
  onChallengeCreated?: (txHash: string) => void;
}) {
  const { data: externalSelectedHero } = useHeroData(selectedFighterHash || "");
  const [hero, setHero] = useState<FighterData>({} as any);

  const { createChallenge, data: txHash } = useCreateChallenge();

  function handleCreateChallenge() {
    if (!token) return toast.error("Select a token");
    if (!amount) return toast.error("Enter a valid amount");

    const FIGHTER = externalSelectedHero || hero;
    if (!validateHeroConfig(FIGHTER)) return;

    createChallenge({
      amount,
      isETHChallenge: token.address === zeroAddress,
      token: token.address,
      fighterHash: generateFighterHash(FIGHTER),
      fighterMetadata: {
        name: FIGHTER.name,
        imageURL: FIGHTER.imageURL,
      },
    });
  }

  useEffect(() => {
    if (txHash) {
      onChallengeCreated?.(txHash);
    }
  }, [txHash]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ActionContinue />
      </AlertDialogTrigger>
      <AlertDialogContent className="flex  bg-arena-black flex-col ">
        <AlertDialogCancel />
        <AlertDialogTitle
          className={cn(
            "gradient-text-name-character text-5xl",
            externalSelectedHero?.name && "mb-12",
          )}
        >
          {externalSelectedHero?.name
            ? "Let's start the battle"
            : "Select your warrior"}
        </AlertDialogTitle>

        {externalSelectedHero?.name ? null : (
          <HeroSelection onHeroSelected={setHero} />
        )}

        <div className="flex gap-3 flex-row justify-end items-center">
          <Cancel asChild>
            <Button asChild className="w-56 py-5" variant="arena-main">
              <Link className="text-arena-orange " href="/challenge">
                Go Back
              </Link>
            </Button>
          </Cancel>
          <Button
            onClick={handleCreateChallenge}
            type="button"
            className="w-56 py-5"
            variant="arena-main"
          >
            {externalSelectedHero?.name ? "Start Battle" : "Create Challenge"}
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
  const formattedFighter = {
    atk: Number(fighter.atk || 0),
    def: Number(fighter.def || 0),
    hp: Number(fighter.hp || 0),
    spd: Number(fighter.spd || 0),
  };

  if (Object.values(formattedFighter).some((v) => v < 1)) {
    return toast.error("Values should be greater than 0"), false;
  }

  if (Object.values(formattedFighter).some((v) => v > 40)) {
    return toast.error("Single values should be <= 40"), false;
  }

  if (Object.values(formattedFighter).reduce((a, b) => a + b, 0) > 100) {
    return toast.error("Sum of values should be less than 100"), false;
  }

  return true;
}
