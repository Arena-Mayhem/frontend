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
import Potion from "./Potion";

export default function SelectPotion() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className=" ">
            <Button
              variant="simple"
              className=" px-10 py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
            >
              Continue
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex items-center flex-col bg-arena-black justify-center">
          <AlertDialogCancel />
          <Potion />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
