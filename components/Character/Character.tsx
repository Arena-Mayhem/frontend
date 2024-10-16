import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useHeroData, useHeroes } from "@/lib/heroes";
import CreateNewChallenge from "./CreateNewChallenge";

export default function Cards() {
  const { heroes } = useHeroes();

  return (
    <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
      <div className="flex flex-col items-center justify-center w-fit gap-6">
        {heroes.map((hero) => (
          <Champs
            key={`hero-${hero.fighterHash}`}
            fighterHash={hero.fighterHash}
            amount="8 USDC"
          />
        ))}
      </div>
    </div>
  );
}

function Champs({
  fighterHash,
  amount,
}: {
  fighterHash: string;
  amount: string;
}) {
  const { data: hero, challengesData } = useHeroData(fighterHash);

  console.debug({ hero });

  return (
    <div className="bg-arena-bg p-8 border border-b-[0.1px] border-white/20 rounded-lg w-full  shadow-padentro ">
      <div className="div-oblicuo bg-arena-black  gradient-border relative ">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <div className="flex justify-between">
          <Image
            className="object-cover w-24"
            src={hero?.imageURL || "/shaman.png"}
            alt=""
            width={800}
            height={800}
          />

          <div
            aria-note-dev="caja-names-points"
            className="flex flex-col px-8 w-full mx-auto justify-center"
          >
            <p className="text-4xl text-white pt-4 font-bold">
              {hero?.name || "Nameless Hero"}
            </p>
            <div className="flex flex-row gap-8 pt-4">
              <p className="text-green-500 text-xl">
                V-{challengesData.totalWon}
              </p>
              <p className="text-red-500 text-xl">
                L-{challengesData.totalLost}
              </p>
            </div>
            <div className="flex flex-row gap-4 py-8">
              <div className="flex gap-1 items-center">
                <Image
                  alt=""
                  className="size-6"
                  src="/hp.svg"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{hero?.hp || "0"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Image
                  alt=""
                  className="size-6"
                  src="/sp.svg"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{hero?.spd || "0"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Image
                  alt=""
                  className="size-6"
                  src="/ap.svg"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{hero?.atk || "0"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Image
                  alt=""
                  className="size-6"
                  src="/dp.svg"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{hero?.def || "0"}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l relative items-center justify-center div-oblicuo gradient-border-left">
            <img
              src="/square.svg"
              className="absolute top-0 left-0 pointer-events-none"
            />

            <img
              src="/square.svg"
              className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
            />

            <div
              aria-note-dev="box-contain button and profit"
              className="flex w-36 flex-grow gap-4 items-center flex-col"
            >
              <div className="hover:animate-wiggle ">
                <Image
                  className="size-20 block"
                  src="/sword.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div className="hover:animate-wiggle">
                <Image
                  className="size-20"
                  src="/potion.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 relative gradient-border-left items-center justify-center p-8 flex-col  div-oblicuo-final-character  ">
            <CreateNewChallenge selectedFighterHash={fighterHash} />
            <Button
              className="gradient-button px-6 py-4 gap-2 text-arena-orange text-lg"
              variant="arena-main"
            >
              EDIT CHARACTER
              <Image src="/edit.svg" alt="arrow" width={20} height={20} />
            </Button>
            <p className="text-white pt-4 text-center text-sm font-bold">
              Earnings: {amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
