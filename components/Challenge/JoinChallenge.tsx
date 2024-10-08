import { Button } from "../ui/button";
import Image from "next/image";

export default function JoinChallenge({ amount }: { amount: string }) {
  return (
    <>
      <div
        aria-note-dev="caja-join-challenge"
        className="flex border-l  relative  items-center justify-center  div-oblicuo gradient-border-left  "
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
            className="gradient-button px-4 py-8  text-arena-orange text-lg"
            variant="arena-main"
          >
            JOIN CHALLENGE
            <Image src="/mayor.svg" alt="arrow" width={20} height={20} />
          </Button>
          <p className="text-white pt-4 text-center text-sm font-bold">
            Posible profit: {amount}
          </p>
        </div>
      </div>
    </>
  );
}
