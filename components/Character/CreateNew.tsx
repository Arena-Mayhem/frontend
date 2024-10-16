import Image from "next/image";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";
import { Button } from "@/components/ui/button";

import CharacterCreation from "./CharacterCreation";

export default function CreateNew() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <div className=" ">
          <Button variant="simple" className="text-white gap-3">
            Create New Character
            <Image
              src="/plus.svg"
              alt=""
              width={1000}
              height={1000}
              className="w-[24px] h-[24px] "
            />
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex items-center flex-col bg-arena-black justify-center">
        <AlertDialogCancel />
        <CharacterCreation onCreateHero={() => setIsOpen(false)} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
