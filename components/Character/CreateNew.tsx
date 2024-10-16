import Image from "next/image";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";

import CharacterCreation from "./CharacterCreation";

export default function CreateNew({ trigger }: { trigger: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="flex items-center flex-col bg-arena-black justify-center">
        <AlertDialogCancel />
        <CharacterCreation onCreateHero={() => setIsOpen(false)} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
