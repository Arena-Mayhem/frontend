import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useHeroData, useHeroes } from "@/lib/heroes";
import CreateNewChallenge from "./CreateNewChallenge";
import NoAddress from "./NoAddress";
import CreateNew from "./CreateNew";

export default function Character() {
  const { heroes } = useHeroes();

  if (heroes.length <= 0) {
    return (
      <NoAddress
        title="NOTHING OVER HERE"
        description="Create a character to get started"
      />
    );
  }

  return (
    <div className="flex items-center py-8 w-full pb-8 mx-8">
      <div className="flex flex-col items-center justify-center w-fit gap-8">
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

  return (
    <div className="bg-arena-bg p-8 border border-b-[0.1px] border-white/20 rounded-lg w-full shadow-padentro">
      <div className="div-oblicuo bg-arena-black gradient-border relative">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <div className="md:flex ml-1 flex-col md:flex-row gap-6 md:gap-0">
          <div className="md:flex h-64 overflow-hidden flex justify-center md:justify-start">
            <Image
              className="object-cover w-44 h-64 object-top"
              src={hero?.imageURL || "/shaman.png"}
              alt="Hero character"
              width={800}
              height={800}
            />
          </div>

          <div
            aria-note-dev="caja-names-points"
            className="flex flex-col px-1 min-w-0 flex-1 justify-center md:items-start space-y-6 md:space-y-4"
          >
            <p className="text-4xl text-white font-bold truncate text-center md:text-left">
              {hero?.name || "Nameless Hero"}
            </p>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <p className="text-green-500 text-xl">
                V-{challengesData.totalWon}
              </p>
              <p className="text-red-500 text-xl">
                L-{challengesData.totalLost}
              </p>
            </div>

            {/* Stats section */}
            <div className="flex flex-row gap-4 md:mr-6 ms:mr-1 justify-center md:justify-start">
              <div className="flex gap-1 items-center md:items-start">
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

          {/* Icons section */}
          <div className="flex md:border-l relative items-center justify-right div-oblicuo md:gradient-border-left mt-5 md:mt-0">
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
              className="flex w-full md:w-36 flex-grow gap-8 md:gap-4 items-center flex-row md:flex-col justify-center py-6 md:py-0"
            >
              <div className="hover:animate-wiggle">
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

          {/* Buttons section */}
          <div className="flex gap-6 relative md:gradient-border-left items-center justify-center p-8 flex-col div-oblicuo-final-character shrink-0 w-64 mt-1 md:mt-0">
            <CreateNewChallenge selectedFighterHash={fighterHash} />
            <CreateNew
              isEditingHeroHash={fighterHash}
              trigger={
                <Button
                  className="gradient-button px-6 py-4 gap-2 text-arena-orange text-lg"
                  variant="arena-main"
                >
                  EDIT CHARACTER
                  <Image src="/edit.svg" alt="arrow" width={20} height={20} />
                </Button>
              }
            />
            <p className="text-white pt-4 text-center text-sm font-bold">
              Earnings: {amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
