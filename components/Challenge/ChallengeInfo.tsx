import Image from "next/image";

export default function ChallengeInfo({
  avatar,
  trofeo,
  created,
  defeats,
  victories,
  owner,
  amount_defeats,
  character_type,
}: {
  avatar: string;
  trofeo: string;
  created: string;
  defeats: string;
  victories: string;
  owner: string;
  amount_defeats: string;
  character_type: string;
}) {
  return (
    <>
      <div
        aria-note-dev="caja-names-points"
        className="flex flex-col w-full   justify-center "
      >
        <div className="flex sm:flex-row flex-col gap-2">
          <div className="flex sm:flex-row gap-2">
            <Image
              className="size-6 border-[1px] border-orange-700 rounded-full  "
              src={avatar}
              alt="champ"
              width={24}
              height={24}
            />
            <p className=" text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700  text-sm">
              {owner}
            </p>
          </div>
          <p className="text-white/50 text-sm">{created}</p>
        </div>
        <p className="text-4xl pt-4 font-bold  text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700">
          {character_type}
        </p>
        <div className=" flex flex-row gap-4 pt-4 ">
          <div className="flex flex-row items-center  gap-[5px]">
            <Image
              className="size-6   "
              src={trofeo}
              alt="cup"
              width={24}
              height={24}
            />
            <p className="text-white text-xl">{victories}</p>
          </div>
          <div className="flex flex-row items-center gap-[5px]">
            <Image
              className="size-6   "
              src={defeats}
              alt="cup"
              width={24}
              height={24}
            />
            <p className="text-white  text-xl">{amount_defeats}</p>
          </div>
        </div>
      </div>
    </>
  );
}
