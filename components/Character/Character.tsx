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
    <div className="flex items-center py-8 w-full pb-8 mx-auto px-2 sm:px-4 max-w-7xl">
      <div className="flex flex-col items-center justify-center w-full gap-8">
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
    <div className="bg-arena-bg p-2 sm:p-4 border border-b-[0.1px] border-white/20 rounded-lg w-full shadow-padentro bg-no-repeat">
      <div className="div-oblicuo bg-arena-black gradient-border relative">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <div className="flex flex-col min-[1322px]:flex-row min-[1322px]:items-stretch gap-3 min-[1322px]:gap-0">
          {/* Hero Image */}
          <div className="flex h-64 overflow-hidden justify-center min-[1322px]:justify-start shrink-0">
            <Image
              className="object-cover w-44 h-64 object-top"
              src={hero?.imageURL || "/shaman.png"}
              alt="Hero character"
              width={800}
              height={800}
            />
          </div>

          {/* Hero Info Container */}
          <div className="flex flex-1 min-w-0 min-[1322px]:max-w-[45%]">
            <div className="flex flex-col px-2 sm:px-4 w-full justify-center space-y-4">
              <p className="text-3xl sm:text-4xl text-white font-bold truncate text-center min-[1322px]:text-left">
                {hero?.name || "Nameless Hero"}
              </p>
              <div className="flex flex-row gap-4 justify-center min-[1322px]:justify-start">
                <p className="text-green-500 text-xl">V-{challengesData.totalWon}</p>
                <p className="text-red-500 text-xl">L-{challengesData.totalLost}</p>
              </div>

              {/* Stats section */}
              <div className="flex flex-row gap-4 justify-center min-[1322px]:justify-start flex-wrap">
                {[
                  { icon: "/hp.svg", value: hero?.hp },
                  { icon: "/sp.svg", value: hero?.spd },
                  { icon: "/ap.svg", value: hero?.atk },
                  { icon: "/dp.svg", value: hero?.def },
                ].map((stat, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <Image
                      alt=""
                      className="size-6"
                      src={stat.icon}
                      width={24}
                      height={24}
                    />
                    <p className="text-white text-xl">{stat.value || "0"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Icons section */}
          <div className="flex min-[1322px]:border-l relative items-center justify-center div-oblicuo gradient-border-horizontal min-[1322px]:gradient-border-left min-[1322px]:w-36">
            <img
              src="/square.svg"
              className="absolute top-0 left-0 pointer-events-none"
            />
            <img
              src="/square.svg"
              className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
            />
<div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-[#f9b208] to-[#c14003] min-[1322px]:hidden"></div>
            <div className="flex w-full gap-4 items-center flex-row min-[1322px]:flex-col justify-center py-4 min-[1322px]:py-0">
              {["/sword.svg", "/potion.svg"].map((icon, index) => (
                <div key={index} className="hover:animate-wiggle">
                  <Image
                    className="size-14 sm:size-16 min-[1322px]:size-20"
                    src={icon}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons section */}
          <div className="flex gap-4 sm:gap-6 relative min-[1322px]:gradient-border-left items-center justify-center p-4 sm:p-8 flex-col div-oblicuo-final-character min-[1322px]:w-auto">
            <CreateNewChallenge selectedFighterHash={fighterHash} />
            <CreateNew
              isEditingHeroHash={fighterHash}
              trigger={
                <Button
                  className="gradient-button px-4 sm:px-6 py-4 gap-2 text-arena-orange text-lg"
                  variant="arena-main"
                >
                  EDIT CHARACTER
                  <Image src="/edit.svg" alt="arrow" width={20} height={20} />
                </Button>
              }
            />
            <p className="text-white pt-2 text-center text-sm font-bold">
              Earnings: {amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
