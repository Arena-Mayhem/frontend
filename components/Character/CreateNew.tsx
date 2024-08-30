import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";
import { Button } from "@/components/ui/button";
import { LuBadgePlus } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import CharacterName from "./CharacterName";

export default function CreateNew() {
  return (
    <>
      <AlertDialog>
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
          <CharacterName />
          <AlertDialogAction asChild></AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
