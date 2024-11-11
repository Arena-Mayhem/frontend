"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog-selectchamp";
import { Button } from "@/components/ui/button";
import { FighterData, useJoinChallenge } from "@/lib/cartesi";
import HeroSelection from "./HeroSelection";
import { Cancel } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";

export default function ModalJoinChallenge({
  challengeId,
  onClose,
}: {
  challengeId: number;
  onClose: () => void;
}) {
  const [hero, setHero] = useState<FighterData>({} as any);
  const { joinChallenge, data: hash } = useJoinChallenge();

  function handleJoinChallenge() {
    if (!hero.name) return toast.error("Select hero to continue");
    const JOIN_GAME_STATE = {
      challenge_id: challengeId,
      fighter: hero,
    };

    joinChallenge(JOIN_GAME_STATE);
  }

  useEffect(() => {
    if (hash) onClose();
  }, [hash]);

  return (
    <AlertDialog
      defaultOpen
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <AlertDialogContent className="flex bg-arena-black flex-col ">
        <AlertDialogCancel />
        <AlertDialogTitle className="gradient-text-name-character text-5xl">
          Select your warrior
        </AlertDialogTitle>

        <HeroSelection onHeroSelected={setHero} />

        <div className="flex gap-3 flex-row justify-end items-center">
          <Cancel asChild>
            <Button asChild className="w-56 py-5" variant="arena-main">
              <Link className="text-arena-orange " href="/challenge">
                Cancel
              </Link>
            </Button>
          </Cancel>
          <Button
            onClick={handleJoinChallenge}
            type="button"
            className="w-56 py-5"
            variant="arena-main"
          >
            Start Match
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
