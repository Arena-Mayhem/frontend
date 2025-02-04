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
    <div className="flex justify-center lg:justify-start py-2 md:py-8 px-4 md:px-0 md:ml-8">
      <div className="flex flex-col items-center lg:items-start w-full gap-6">
        {history.map((challenge) => (
          <Ended {...challenge} key={`challenge-h-${challenge.id}`} />
        ))}
      </div>
    </div>
  );
}

// Left-aligned player info component for mobile view
function PlayerInfoMobileLeft({
  address,
  name,
  imageURL,
}: FighterData & {
  address: Address;
  imageURL?: string;
}) {
  const { totalLost, totalWon } = useAcceptedChallenges(address);

  return (
    <div className="flex flex-col w-24">
      <figure className="size-40 mb-2 ml-[-2.5rem]">
        <Image
          className="object-cover w-full h-full "
          src={imageURL || "/shaman.png"}
          alt={`${name}'s image`}
          width={400}
          height={400}
        />
      </figure>

      <div className="flex items-center gap-2">
        <Image
          className="size-6 shrink-0 border-px border-orange-700 rounded-full"
          width={24}
          height={24}
          src="/tanos.png"
          alt=""
        />
        <p className="text-transparent bg-clip-text bg-gradient-to-b from-arena-orange to-orange-700 text-xs truncate">
          {beautifyAddress(address)}
        </p>
      </div>

      <p className="text-xl text-white mt-2 font-bold truncate">{name}</p>

      <div className="flex gap-4 mt-1">
        <div className="flex items-center gap-1">
          <IconCup className="size-5"/>
          <p className="text-white text-sm">{totalWon}</p>
        </div>
        <div className="flex items-center gap-1">
          <IconSkull className="size-5"/>
          <p className="text-white text-sm">{totalLost}</p>
        </div>
      </div>
    </div>
  );
}

// Right-aligned player info component for mobile view
function PlayerInfoMobileRight({
  address,
  name,
  imageURL,
}: FighterData & {
  address: Address;
  imageURL?: string;
}) {
  const { totalLost, totalWon } = useAcceptedChallenges(address);

  return (
    <div className="flex flex-col">
      <figure className="size-40 mb-2 mr-[-2.5rem]">
        <Image
          className="object-cover w-full h-full"
          src={imageURL || "/shaman.png"}
          alt={`${name}'s image`}
          width={400}
          height={400}
        />
      </figure>

      <div className="flex items-center gap-2 justify-end">
        <p className="text-transparent bg-clip-text bg-gradient-to-b from-arena-orange to-orange-700 text-xs truncate">
          {beautifyAddress(address)}
        </p>
        <Image
          className="size-6 shrink-0 border-px border-orange-700 rounded-full"
          width={24}
          height={24}
          src="/tanos.png"
          alt=""
        />
      </div>

      <p className="text-xl text-white mt-2 font-bold text-right truncate">{name}</p>

      <div className="flex gap-4 mt-1 justify-end">
        <div className="flex items-center gap-1">
          <IconCup className="size-5"/>
          <p className="text-white text-sm">{totalWon}</p>
        </div>
        <div className="flex items-center gap-1">
          <IconSkull className="size-5"/>
          <p className="text-white text-sm">{totalLost}</p>
        </div>
      </div>
    </div>
  );
}

// Desktop-specific player info component
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

        <div className="flex flex-row gap-4 pt-4">
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
          alt={`${name}'s image`}
          width={400}
          height={400}
        />
      </figure>
    </div>
  );
}

// Component for displaying ended challenges
function Ended(props: GameData) {
  const { address } = useAccount();
  const FORMATTED_ADDRESS = address?.toLocaleLowerCase();
  const token = useTokenData(props?.token);
  const VET_VALUE = formatUnits(BigInt(props.amount), token?.decimals || 18);
  const IS_VICTORY = props?.winner?.address?.toLowerCase() === FORMATTED_ADDRESS;

  const PLAYER_1 = {
    ...props?.players?.[0]!,
    imageURL: props.input?.fighterMetadata?.imageURL
  };
  const PLAYER_2 = {
    ...props?.players?.[1]!,
    imageURL: props.input?.fighterMetadata?.imageURL
  };

  if (!PLAYER_1 || !PLAYER_2) {
    return null;
  }

  return (
    <div className="w-full md:pt-8 md:bg-arena-bg md:bg-cover md:bg-no-repeat md:pb-8 lg:pb-8 md:p-8 md:border md:border-b md:border-white/20 md:rounded-lg md:shadow-padentro">
      <div className="relative px-8 lg:px-5 pb-2 div-oblicuo bg-arena-black gradient-border">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        
        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden">
          <div className="pt-4 flex flex-col items-center mb-4">
            {IS_VICTORY ? (
              <IconCup className="size-12" />
            ) : (
              <IconSkull className="size-12" />
            )}
            <p className={`text-3xl font-bold mt-1 ${IS_VICTORY ? "gradient-text-victory" : "gradient-text-defeat"}`}>
              {IS_VICTORY ? "VICTORY" : "DEFEAT"}
            </p>
            <div className="flex flex-col items-center -mt-1.5">
              <p className={`whitespace-nowrap text-sm ${IS_VICTORY ? "text-green-500" : "text-red-500"}`}>
                <span className="text-lg">{IS_VICTORY ? "+" : "-"}</span> {VET_VALUE} {token?.symbol || "ETH"}
              </p>
              <p className="text-white/50 text-xs text-center whitespace-nowrap">
                {formatDistance(new Date(props?.timestamp), new Date())}
              </p>
            </div>
          </div>

          <div className="mb-1 mt-1 flex items-center h-px bg-arena-orange"></div>
          {
          /* Players Section */}
          <div className="flex justify-between items-start w-full">
            {/* Player 1 */}
            <div className="flex flex-col w-32">
              <PlayerInfoMobileLeft {...PLAYER_1} />
            </div>

            {/* VS Text */}
            <div className="flex items-center mt-24">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-arena-orange to-orange-700 text-3xl font-bold">VS</span>
            </div>

            {/* Player 2 */}
            <div className="flex flex-col items-end w-32">
              <PlayerInfoMobileRight {...PLAYER_2} />
            </div>
          </div>

          <div className="mt-5 flex items-center h-px bg-arena-orange"></div>
          {
          /* Watch Button */}
          <div className="flex justify-center mt-6 pb-5">
            <Button className="px-28 py-6 text-arena-orange text-lg" variant="arena-main">
              WATCH
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex flex-row">
            <PlayerInfo {...PLAYER_1} className="w-full lg:w-auto" />
            <div className="py-6 flex items-center flex-col">
              {IS_VICTORY ? (
                <IconCup className="size-12" />
              ) : (
                <IconSkull className="size-12" />
              )}
              <p className={`text-4xl mt-2 font-bold ${IS_VICTORY ? "gradient-text-victory" : "gradient-text-defeat"}`}>
                {IS_VICTORY ? "VICTORY" : "DEFEAT"}
              </p>
              <div className="flex gap-2 items-center pt-2 pb-4">
                <p className={`border-r-px whitespace-nowrap text-sm px-2 ${IS_VICTORY ? "text-green-500" : "text-red-500"}`}>
                  <span className="text-lg">{IS_VICTORY ? "+" : "-"}</span> {VET_VALUE} {token?.symbol || "ETH"}
                </p>
                <p className="text-white/50 text-xs whitespace-nowrap">
                  {formatDistance(new Date(props?.timestamp), new Date())}
                </p>
              </div>
              <Button className="px-2 text-arena-orange text-lg" variant="arena-main">
                WATCH
              </Button>
            </div>
            <PlayerInfo {...PLAYER_2} className="flex-row-reverse [&_.Nickname]:items-end" />
          </div>
        </div>
      </div>
    </div>
  );
}
