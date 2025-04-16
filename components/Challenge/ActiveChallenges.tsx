import React, { useState } from "react";
import Image from "next/image";
import { formatUnits } from "viem";
import { formatDistance } from "date-fns";

import { useHeroData } from "@/lib/heroes";
import { type GameData, useChallenges } from "@/lib/queries";
import { useTokenData } from "@/lib/tokens";
import { useStartMatch } from "@/lib/cartesi";

import JoinChallengeWidget from "./JoinChallengeWidget";
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
        title="NOTHING TO SEE HERE"
        description="Create a challenge to continue"
      />
    );
  }

  return (
    <div className="flex items-center justify-center pt-2 lg:py-8 w-full px-4 lg:mx-8">
      <div className="flex flex-col items-center lg:items-stretch justify-center w-full gap-6">
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
    <div className="md:pt-8 lg:bg-arena-bg pb-4 lg:p-8 lg:border lg:border-b lg:border-white/20 lg:rounded-lg lg:shadow-padentro">
      <div className="div-oblicuo bg-arena-black gradient-border relative">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <div className="p-5 lg:p-0 flex flex-col lg:flex-row lg:justify-between w-full">
          <div className="h-48 bg-arena-bg lg:!bg-none rounded-lg lg:rounded-none shadow-padentro lg:shadow-none w-full lg:w-auto flex justify-center lg:justify-start overflow-hidden">
            <div className="relative h-48 w-full lg:w-56">
              <Image
                className="object-cover w-full h-full"
                src={props.input?.fighterMetadata?.imageURL || "/shaman.png"}
                alt=""
                width={1000}
                height={1000}
              />
            </div>
          </div>
          <ChallengeInfo
            avatar="/tanos.png"
            created={formatDistance(
              new Date(props.timestamp * 1000),
              new Date(),
              {
                addSuffix: true,
              },
            )
              .replace("about", "")
              .replace("less than", "")
              .trim()}
            character_type={props?.input?.fighterMetadata?.name || "Player"}
            owner={props.address_owner}
          />
          <JoinChallengeWidget
            onAction={handleJoinChallenge}
            isGameStart={isGameAccepted}
            isGameEnd={props.status === "finished"}
            symbol={token?.symbol || "TEST"}
            amount={
              Number(betValue) // force number
            }
          />
        </div>
      </div>

      {isJoining && (
        <ModalJoinChallenge
          challengeId={props.id}
          onClose={() => setIsJoining(false)}
        />
      )}
    </div>
  );
}

export default ActiveChallenges;
