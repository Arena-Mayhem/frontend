import { Button } from "../ui/button";
import Image from "next/image";

export default function JoinChallengeButton({
  amount,
  onAction,
  isGameStart,
  isGameEnd,
}: {
  amount: string;
  onAction?: () => void;
  isGameStart?: boolean;
  isGameEnd?: boolean;
}) {
  return (
    <>
      <div
        aria-note-dev="caja-join-challenge"
        className="flex border-l relative items-center justify-center div-oblicuo gradient-border-left"
      >
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <div
          aria-note-dev="box-contain button and profit"
          className="m-12 w-full "
        >
          <Button
            onClick={onAction}
            disabled={isGameEnd}
            className="gradient-button gap-2 px-6 py-8 text-arena-orange text-lg"
            variant="arena-main"
          >
            <span>
              {isGameEnd
                ? "FINISHED"
                : isGameStart
                  ? "START MATCH"
                  : "JOIN CHALLENGE"}
            </span>
            <Image src="/mayor.svg" alt="arrow" width={20} height={20} />
          </Button>
          <p className="text-white pt-4 text-center text-sm font-bold">
            {isGameEnd ? "Earned" : "Posible profit"}: {amount}
          </p>
        </div>
      </div>
    </>
  );
}
