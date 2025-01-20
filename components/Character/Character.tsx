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
    <div className="flex items-center justify-center pt-2 lg:pt-1 w-[calc(100%-1rem)] mx-auto sm:m-7">
      <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-6">
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
    <div className="lg:-ml-16 md:pt-8 lg:bg-arena-bg pb-4 lg:p-8 lg:border lg:border-b lg:border-white/20 lg:rounded-lg lg:shadow-padentro w-full">
 
      <div className="mx-1 div-oblicuo bg-arena-black gradient-border relative">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        
        <div className="lg:-ml-4 pt-5 lg:pt-0 p-4 lg:p-0 flex flex-col lg:flex-row md:justify-between w-full">

          <div className="lg:-mr-4 pt-6 lg:pt-0 h-52 bg-arena-bg lg:!bg-none rounded-lg lg:rounded-none shadow-padentro lg:shadow-none w-full lg:w-auto flex justify-center lg:justify-start overflow-hidden">
            <div className="relative w-52 lg:w-44">
              <Image
                className="object-cover object-center scale-150 lg:scale-100 w-full h-full"
                src={hero?.imageURL || "/shaman.png"}
                alt="Hero character"
                width={1000}
                height={1000}
              />
            </div>
          </div>


          <div className="min-w-[115px] flex flex-1 min-w-0 lg:max-w-[45%]">
            <div className="flex flex-col px-1 w-full justify-center space-y-2 lg:space-y-2">
              <p className="pt-4 lg:pt-0 text-2xl lg:text-4xl text-white font-bold truncate text-center lg:text-left">
                {hero?.name || "Nameless Hero"}
              </p>
              <div className="flex flex-row gap-2 justify-center lg:justify-start">
                <p className="text-green-500 text-base lg:text-xl">
                  V-{challengesData.totalWon}
                </p>
                <p className="text-white text-base lg:text-xl">/</p>
                <p className="text-red-500 text-base lg:text-xl">
                  L-{challengesData.totalLost}
                </p>
              </div>

            
              <div className="pb-4 lg:pb-0 lg:mr-1 flex flex-row gap-2 justify-center lg:justify-start flex-wrap">
                {[
                  { icon: "/hp.svg", value: hero?.hp },
                  { icon: "/sp.svg", value: hero?.spd },
                  { icon: "/ap.svg", value: hero?.atk },
                  { icon: "/dp.svg", value: hero?.def },
                ].map((stat, index) => (
                  <div key={index} className="flex gap-1 items-center ">
                    <Image
                      alt=""
                      className="size-4 lg:size-5"
                      src={stat.icon}
                      width={20}
                      height={20}
                    />
                    <p className="text-white text-lg">{stat.value || "0"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="flex lg:border-l relative items-center justify-center lg:div-oblicuo gradient-border-horizontal lg:gradient-border-left lg:w-36">
            <img
              src="/square.svg"
              className="absolute top-0 left-0 pointer-events-none hidden lg:block"
            />
            <img
              src="/square.svg"
              className="absolute rotate-180 bottom-0 right-0 pointer-events-none hidden lg:block"
            />
            
            
            <div className="flex w-full lg:gap-4 items-center flex-row lg:flex-col justify-center py-4 lg:py-0">
              {["/sword.svg", "/potion.svg"].map((icon, index) => (
                <div key={index} className="hover:animate-wiggle px-2 lg:px-0">
                  <Image
                    className="size-16 lg:size-20"
                    src={icon}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="pb-4 gradient-border-horizontal lg:hidden"/>


          <div className="lg:gradient-border-left lg:div-oblicuo-final-character">
            <div className="md:ml-8 md:mx-4 pt-2 md:pt-6 flex gap-4 sm:gap-6 flex-col ">
            <CreateNewChallenge selectedFighterHash={fighterHash} />
            <CreateNew
              isEditingHeroHash={fighterHash}
              trigger={
                <Button
                  className="gradient-button px-5 py-6 gap-2 text-arena-orange text-base"
                  variant="arena-main"
                >
                  EDIT CHARACTER
                  <Image src="/edit.svg" alt="arrow" width={20} height={20} />
                </Button>
              }
            />
            <p className="text-white pt-0 text-center text-sm font-bold">
              earnings: {amount}
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
