import Image from "next/image";
import { Address } from "viem";

import IconCup from "@/components/icons/IconCup";
import IconSkull from "@/components/icons/IconSkull";
import { useAcceptedChallenges } from "@/lib/queries";
import { beautifyAddress } from "@/components/ui/button-connectwallet";

export default function ChallengeInfo({
  avatar,
  created,
  owner,
  character_type,
}: {
  avatar: string;
  created: string;
  owner: Address;
  character_type: string;
}) {
  const { totalLost, totalWon } = useAcceptedChallenges(owner);

  return (
    <div className="pt-6 ml-1 flex flex-col w-full justify-center">
      <div className="w-full flex flex-row items-center justify-between sm:justify-start sm:gap-2">
        <div className="flex flex-row items-center gap-2">
          <Image
            className="size-6 border-[1px] border-orange-700 rounded-full"
            src={avatar}
            alt="champ"
            width={24}
            height={24}
          />
          <p className="text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700 text-sm">
            {beautifyAddress(owner)}
          </p>
        </div>
        <p className="text-white/50 text-xs md:text-sm mr-2 md:mr-0">{created}</p>
      </div>

      <p className="text-4xl pt-4 font-bold text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700">
        {character_type}
      </p>

      <div className="flex flex-row gap-4 pt-4">
        <div className="flex flex-row items-center gap-[5px]">
          <IconCup className="size-6" />
          <p className="text-white text-xl">{totalWon}</p>
        </div>
        <div className="flex flex-row items-center gap-[5px]">
          <IconSkull className="size-6" />
          <p className="text-white text-xl">{totalLost}</p>
        </div>
      </div>
    </div>
  );
}
