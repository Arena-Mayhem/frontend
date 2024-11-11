import Image from "next/image";
import { formatUnits } from "viem";
import { formatDistance } from "date-fns";
import { useState } from "react";

import { useHeroData } from "@/lib/heroes";
import { type GameData, useChallenges } from "@/lib/queries";
import { useTokenData } from "@/lib/tokens";
import { useStartMatch } from "@/lib/cartesi";

import JoinChallengeButton from "./JoinChallengeButton";
import ChallengeInfo from "./ChallengeInfo";
import NoAddress from "../Character/NoAddress";
import ModalJoinChallenge from "./ModalJoinChallenge";

function ActiveChallenges() {
  const { challenges } = useChallenges();

  const activeChallenges = challenges.filter(
    ({ status }) => status != "finished",
  );

  if (activeChallenges.length <= 0) {
    return (
      <NoAddress
        title="NOTHING OVER HERE"
        description="Create a challenge to get started!"
      />
    );
  }

  return (
    <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
      <div className="flex flex-col items-center justify-center w-full gap-6">
        {activeChallenges.map((challenge) => (
          <ActiveChallenge key={`challenge-${challenge.id}`} {...challenge} />
        ))}
      </div>
    </div>
  );
}

function ActiveChallenge(props: GameData) {
  const [isJoining, setIsJoining] = useState(false);
  const { data: hero } = useHeroData(props.fighter_hash);
  const { startMatch } = useStartMatch();

  const token = useTokenData(props.token);
  const betValue = formatUnits(BigInt(props.amount), token?.decimals || 18);

  const isGameAccepted = props.status === "accepted";
  const isWaitingForOpponent = props.status === "pending";

  function handleJoinChallenge() {
    console.debug({ props, hero });
    if (isWaitingForOpponent) {
      return setIsJoining(true);
    }

    if (isGameAccepted) {
      return startMatch({
        challenge_id: props.id,
        fighter: hero!,
      });
    }
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
              src={props.input?.fighterMetadata?.imageURL || "/shaman.png"}
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <ChallengeInfo
            avatar="/tanos.png"
            created={formatDistance(new Date(props.timestamp), new Date(), {
              addSuffix: true,
            })
              .replace("about", "")
              .replace("less than", "")
              .trim()}
            character_type={props?.input?.fighterMetadata?.name || "Player"}
            owner={props.address_owner}
          />
          {isJoining && (
            <ModalJoinChallenge
              challengeId={props.id}
              onClose={() => setIsJoining(false)}
            />
          )}
          <JoinChallengeButton
            onAction={handleJoinChallenge}
            isGameStart={isGameAccepted}
            isGameEnd={props.status === "finished"}
            amount={`${betValue} ${token?.symbol || "TEST"}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ActiveChallenges;
