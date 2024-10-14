import Image from "next/image";

import ChallengeInfo from "./ChallengeInfo";
import JoinChallenge from "./JoinChallenge";
import { type GameData, useChallenges } from "@/lib/queries";
import { useTokenData } from "@/lib/tokens";
import { formatUnits } from "viem";
import { beautifyAddress } from "@/components/ui/button-connectwallet";
import { useJoinChallenge, useStartMatch } from "@/lib/cartesi";

import { formatDistance } from "date-fns";

function ActiveChallenges() {
  const { challenges } = useChallenges();

  return (
    <>
      <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          {challenges
            .filter(({ status }) => status != "finished")
            .map((challenge) => (
              <Actives key={`challenge-${challenge.id}`} {...challenge} />
            ))}
        </div>
      </div>
    </>
  );
}

function Actives(props: GameData) {
  const { joinChallenge } = useJoinChallenge();
  const { startMatch } = useStartMatch();
  const token = useTokenData(props.token);
  const betValue = formatUnits(BigInt(props.amount), token?.decimals || 18);

  const isGameAccepted = props.status === "accepted";

  function handleJoinChallenge() {
    const GAME_STATE = {
      challenge_id: props.id,
      fighter: {
        spd: 15,
        atk: 35,
        def: 25,
        hp: 25,
        name: "Leonardo",
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
              className="object-cover w-full h-full"
              src="/shaman.png"
              alt="champsword"
              width={1000}
              height={1000}
            />
          </div>
          <ChallengeInfo
            victories="9"
            avatar="/tanos.png"
            created={formatDistance(new Date(props.timestamp), new Date(), {
              addSuffix: true,
            })
              .replace("about", "")
              .trim()}
            character_type={props.winner?.name || "Player"}
            amount_defeats="3"
            owner={beautifyAddress(props.address_owner)}
          />
          <JoinChallenge
            onAction={handleJoinChallenge}
            isGameStart={isGameAccepted}
            isGameEnd={props.status === "finished"}
            amount={`${betValue} ${token?.symbol}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ActiveChallenges;
