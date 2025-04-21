"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";

import CharacterCreation from "./CharacterCreation";

export default function CreateNew({
  trigger,
  isEditingHeroHash,
}: {
  trigger: JSX.Element;
  isEditingHeroHash?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="flex items-center flex-col bg-arena-black justify-center">
        <AlertDialogCancel />
        <CharacterCreation
          isEditingHeroHash={isEditingHeroHash}
          onCreateHero={() => setIsOpen(false)}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
