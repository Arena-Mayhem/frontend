import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Bet from "./Bet";
import Image from "next/image";
import SelectChamp, { ActionContinue } from "./SelectChamp";
import { toast } from "sonner";

export default function PayforCreate() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="simple" className="text-white  gap-3">
            Create Challenge
            <Image
              src="/plus.svg"
              alt=""
              width={1000}
              height={1000}
              className="w-[24px] h-[24px] "
            />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex items-center flex-col bg-arena-black justify-center">
          <AlertDialogCancel />
          <AlertDialogTitle className="text-5xl gradient-text-name-character text-center">
            Create Challenge
          </AlertDialogTitle>
          <Bet>
            {({ isValidBet, token, value }) => {
              if (isValidBet) {
                return <SelectChamp amount={value} token={token} />;
              }
              return (
                <ActionContinue
                  onClick={() => {
                    toast.error("Inter a valid amount");
                  }}
                />
              );
            }}
          </Bet>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
