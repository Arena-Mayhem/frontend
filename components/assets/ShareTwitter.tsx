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
import Image from "next/image";
import ScreenShot from "./Screenshot";

export default function ShareTwitter() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className=" ">
            <Button
              className=" items-center justify-end gap-2 flex"
              variant="simple"
            >
              <p className="text-white">SHARE ON TWITTER</p>
              <Image
                src="/share.svg"
                alt=""
                width={1000}
                height={1000}
                className="w-[24px] h-[24px]"
              />
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col bg-arena-black justify-center">
          <ScreenShot />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
