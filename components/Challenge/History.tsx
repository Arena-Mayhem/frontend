import Image from "next/image";
import type { WithClassName } from "@/lib/types";
import {
  type GameData,
  useAcceptedChallenges,
  useChallenges,
} from "@/lib/queries";
import { type Address, formatUnits } from "viem";

import { formatDistance } from "date-fns";

import { cn } from "@/lib/utils";
import { useTokenData } from "@/lib/tokens";
import { beautifyAddress } from "@/components/ui/button-connectwallet";

import { Button } from "@/components/ui/button";

import IconCup from "@/components/icons/IconCup";
import IconSkull from "@/components/icons/IconSkull";

import { FighterData } from "@/lib/cartesi";
import { useAccount } from "wagmi";
import NoAddress from "@/components/Character/NoAddress";

export default function History() {
  const { challenges } = useChallenges();
  const history = challenges.filter(({ status }) => status === "finished");

  if (history.length <= 0) {
    return (
      <NoAddress
        title="NOTHING TO SEE HERE"
        description="Create a challenge to continue"
      />
    );
  }

  return (
    <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
      <div className="flex flex-col items-center justify-center w-fit gap-6">
        {history.map((challenge) => (
          <Ended {...challenge} key={`challenge-h-${challenge.id}`} />
        ))}
      </div>
    </div>
  );
}

function Ended(props: GameData) {
  const { address } = useAccount();
  const FORMATTED_ADDRESS = address?.toLocaleLowerCase();

  const token = useTokenData(props?.token);

  const VET_VALUE = formatUnits(BigInt(props.amount), token?.decimals || 18);
  const IS_VICTORY = props?.winner?.address === FORMATTED_ADDRESS;

  const PLAYER_1 = props?.players?.[0]!;
  const PLAYER_2 = props?.players?.[1]!;

  return (
    <div className="bg-arena-bg p-6 border border-b-[0.1px] border-white/20 rounded-lg w-full shadow-padentro">
      <div className="relative px-5 pb-2 div-oblicuo bg-arena-black gradient-border">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <div className="flex">
          <PlayerInfo {...PLAYER_1} />

          <div className="flex items-center flex-col pt-4">
            <IconSkull className="size-12" />

            <p
              className={`text-4xl mt-2 font-bold ${IS_VICTORY ? "gradient-text-victory" : "gradient-text-defeat"}`}
            >
              {IS_VICTORY ? "VICTORY" : "DEFEAT"}
            </p>

            <div className="flex gap-2 items-center pt-2 pb-4">
              <p
                className={`border-r-px whitespace-nowrap text-sm px-2 ${IS_VICTORY ? "text-green-500" : "text-red-500"} `}
              >
                <span className="text-lg">{IS_VICTORY ? "+" : "-"}</span>{" "}
                {VET_VALUE} {token?.symbol || "ETH"}
              </p>

              <p className="text-white/50 text-xs whitespace-nowrap">
                {formatDistance(new Date(props?.timestamp), new Date())}
              </p>
            </div>

            <Button
              className="gradient-button  px-2 my-2 rounded-xl  text-arena-orange text-lg"
              variant="arena-main"
            >
              WATCH
            </Button>
          </div>

          <PlayerInfo
            {...PLAYER_2}
            className="flex-row-reverse [&_.Nickname]:items-end"
          />
        </div>
      </div>
    </div>
  );
}

function PlayerInfo({
  className,
  address,
  name,
  imageURL,
}: WithClassName<
  FighterData & {
    address: Address;
    imageURL?: string;
  }
>) {
  const { totalLost, totalWon } = useAcceptedChallenges(address);

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex Nickname flex-col w-full">
        <div className="flex flex-row gap-2">
          <Image
            className="size-6 shrink-0 border-px border-orange-700 rounded-full"
            width={24}
            height={24}
            src="/tanos.png"
            alt=""
          />
          <p className="text-transparent bg-clip-text bg-gradient-to-b from-arena-orange to-orange-700 text-sm">
            {beautifyAddress(address)}
          </p>
        </div>

        <p className="text-3xl text-white pt-4 font-bold">{name}</p>

        <div className=" flex flex-row gap-4 pt-4">
          <div className="flex flex-row items-center gap-2">
            <IconCup />
            <p className="text-white text-lg">{totalWon}</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <IconSkull />
            <p className="text-white text-lg">{totalLost}</p>
          </div>
        </div>
      </div>

      <figure className="shrink-0 size-40">
        <Image
          className="object-cover w-full h-full"
          src={imageURL || "/shaman.png"}
          alt=""
          width={400}
          height={400}
        />
      </figure>
    </div>
  );
}
