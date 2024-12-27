import { Button } from "./button";
import { ComponentProps } from "react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Bet from "../Challenge/Bet";
import { useHeroes } from "@/lib/heroes";
import CreateNew from "@/components/Character/CreateNew";
import SelectChamp, { ActionContinue } from "../Challenge/SelectChamp";

// We keep the same type structure as ButtonWallet for consistency
type SizeType = "default" | "mobile";

type CreateChallengeButtonProps = Omit<
  ComponentProps<typeof Button>,
  "size"
> & {
  size?: SizeType;
};

export const CreateChallengeButton = ({
  size = "default" as SizeType,
  ...props
}: CreateChallengeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { heroes } = useHeroes();
  const isHeroCreated = heroes.length > 0;
  const isMobile = size === "mobile";

  // The button content
  const ButtonContent = (
    <Button
      variant="arena-main"
      className={isMobile ? "text-xs px-1 py-1" : "text-lg"}
      {...props}
    >
      Create Challenge
    </Button>
  );

  // Return CreateNew component if no heroes exist
  if (!isHeroCreated) {
    return <CreateNew trigger={ButtonContent} />;
  }

  // Return the challenge dialog if heroes exist
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{ButtonContent}</AlertDialogTrigger>
      <AlertDialogContent className="flex items-center flex-col bg-arena-black justify-center">
        <AlertDialogCancel />
        <AlertDialogTitle className="text-5xl gradient-text-name-character text-center">
          Create Challenge
        </AlertDialogTitle>
        <Bet>
          {({ isValidBet, token, value }) => {
            if (isValidBet) {
              return (
                <SelectChamp
                  onChallengeCreated={() => {
                    setIsOpen(false);
                    toast.success("Challenge created");
                  }}
                  amount={value}
                  token={token}
                />
              );
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
  );
};
