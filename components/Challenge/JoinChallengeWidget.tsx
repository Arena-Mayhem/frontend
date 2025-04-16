import { Button } from "../ui/button";
import Image from "next/image";

export default function JoinChallengeButton({
  amount,
  onAction,
  isGameStart,
  isGameEnd,
  symbol,
}: {
  amount: number;
  symbol: string;
  onAction?: () => void;
  isGameStart?: boolean;
  isGameEnd?: boolean;
}) {
  return (
    <>
      <div
        aria-note-dev="caja-join-challenge"
        className="md:pt-3 flex lg:border-l relative items-center justify-center lg:div-oblicuo lg:gradient-border-left"
      >
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none hidden lg:block"
        />
        <div
          aria-note-dev="box-contain button and profit"
          className="m-6 w-full flex flex-col items-center"
        >
          <Button
            onClick={onAction}
            disabled={isGameEnd}
            className="gradient-button py-6 w-[14rem] md:gap-2 md:px-6 text-arena-orange text-lg"
            variant="arena-main"
          >
            <span>
              {isGameEnd
                ? "FINISHED"
                : isGameStart
                  ? "START MATCH"
                  : "JOIN NOW"}
            </span>
            <Image src="/mayor.svg" alt="arrow" width={20} height={20} />
          </Button>
          <p className="pt-4 whitespace-nowrap text-white text-center text-xs md:text-sm font-bold">
            {isGameEnd ? "Earned" : "Reward"}:{" "}
            {amount < 1e-4 ? "< 0.0001" : Number(amount.toFixed(4))} {symbol}
          </p>
        </div>
      </div>
    </>
  );
}
