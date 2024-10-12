import Image from "next/image";

import ChallengeInfo from "./ChallengeInfo";
import JoinChallenge from "./JoinChallenge";
import { type GameData, useChallenges } from "@/lib/queries";
import { useTokenData } from "@/lib/tokens";
import { formatUnits, zeroAddress } from "viem";
import { beautifyAddress } from "@/components/ui/button-connectwallet";
import { useJoinChallenge, useStartMatch } from "@/lib/cartesi";

function ActiveChallenges() {
  const { challenges } = useChallenges();

  return (
    <>
      <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          {challenges.map((challenge) => (
            <Actives key={`challenge-${challenge.id}`} {...challenge} />
          ))}
        </div>
      </div>
    </>
  );
}

function Actives(props: GameData) {
  console.debug({ props });
  const { joinChallenge } = useJoinChallenge();
  const { startMatch } = useStartMatch();
  const token = useTokenData(props.token === null ? zeroAddress : props.token);
  const betValue = formatUnits(BigInt(props.amount), token?.decimals || 18);

  const isGameAccepted = props.status === "accepted";

  function handleJoinChallenge() {
    const GAME_STATE = {
      challenge_id: props.id,
      fighter: {
        atk: 10,
        def: 25,
        hp: 25,
        spd: 15,
        name: "Leonardito",
        weapon: "sword",
      },
    };

    if (isGameAccepted) return startMatch(GAME_STATE);
    joinChallenge(GAME_STATE);
  }

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
          className="flex justify-between w-full"
        >
          <div
            aria-dev-note="caja-imagen"
            className=" flex-shrink-0 flex-col  relative  overflow-hidden  h-[220px]  "
          >
            <Image
              className="object-cover w-full h-full "
              src="/shaman.png"
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
            owner={beautifyAddress(props.owner)}
          />
          <JoinChallenge
            onAction={handleJoinChallenge}
            isGameStart={isGameAccepted}
            amount={`${betValue} ${token?.symbol}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ActiveChallenges;
