import Image from "next/image";

import ChallengeInfo from "./ChallengeInfo";
import JoinChallenge from "./JoinChallenge";

function ActiveChallenges() {
  return (
    <>
      <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <Actives character="/shaman.png" />
        </div>
      </div>
    </>
  );
}

function Actives({ character }: { character: string }) {
  return (
    <div className="bg-arena-bg p-8 border border-b-[0.1px] border-white/20 rounded-lg w-full  shadow-padentro ">
      <div className="div-oblicuo bg-arena-black  gradient-border relative">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <div
          aria-dev-note="caja-contenedora-de-los-tres-elementos"
          className="  flex justify-between  w-full "
        >
          <div
            aria-dev-note="caja-imagen"
            className=" flex-shrink-0 flex-col  relative  overflow-hidden  h-[220px]  "
          >
            <Image
              className="object-cover  w-full h-full "
              src={character}
              alt="champsword"
              width={1000}
              height={1000}
            />
          </div>
          <ChallengeInfo
            victories="9"
            avatar="/tanos.png"
            created="4 days ago"
            trofeo="/cup.svg"
            defeats="/defeats.svg"
            character_type="KNIGHT"
            amount_defeats="3"
            owner="leon.eth"
          />
          <JoinChallenge amount="4 USDC" />
        </div>
      </div>
    </div>
  );
}

export default ActiveChallenges;
