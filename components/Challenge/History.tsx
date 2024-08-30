import Image from "next/image";
import { Button } from "../ui/button";

export default function History() {
  return (
    <>
      <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
        <div className="flex flex-col items-center justify-center w-fit gap-6">
          <Ended
            character="/wizard.png"
            victory_or_defeat="/cup.svg"
            victories="8"
            avatar="/tanos.png"
            finished="2 hours ago"
            trofeo="/cup.svg"
            defeats="/defeats.svg"
            amount_defeats="4"
            character_type="wizard"
            owner="marvin.eth"
            status="VICTORY"
            amount="15"
            character_player2="/shaman.png"
            amount_victories_player2="14"
            avatar_player2="/tanos.png"
            character_type_player2="SHAMAN"
            amount_defeats_player2="9"
            owner_player2="ratita.eth"
          />
          <Ended
            character="/barak.png"
            victory_or_defeat="/defeats.svg"
            victories="2"
            avatar="/tanos.png"
            finished="4 hours ago"
            trofeo="/cup.svg"
            defeats="/defeats.svg"
            amount_defeats="9"
            character_type="BARAK"
            owner="marvin.eth"
            status="DEFEAT"
            amount="7"
            character_player2="/wizard.png"
            amount_victories_player2="9"
            avatar_player2="/tanos.png"
            character_type_player2="WIZARD"
            amount_defeats_player2="3"
            owner_player2="stevejobs.eth"
          />
          <Ended
            character="/wizard.png"
            victory_or_defeat="/cup.svg"
            victories="5"
            avatar="/tanos.png"
            finished="9 hours ago"
            trofeo="/cup.svg"
            defeats="/defeats.svg"
            amount_defeats="9"
            character_type="WIZARD"
            owner="marvin.eth"
            status="VICTORY"
            amount="3"
            character_player2="/wizard.png"
            amount_victories_player2="1"
            avatar_player2="/tanos.png"
            character_type_player2="WIZARD"
            amount_defeats_player2="2"
            owner_player2="therealcatlover.eth"
          />
          <Ended
            character="/barak.png"
            victory_or_defeat="/cup.svg"
            victories="8"
            avatar="/tanos.png"
            finished="12 hours ago"
            trofeo="/cup.svg"
            defeats="/defeats.svg"
            amount_defeats="4"
            character_type="barak"
            owner="marvin.eth"
            status="DEFEAT"
            amount="1"
            character_player2="/knight.png"
            amount_victories_player2="14"
            avatar_player2="/tanos.png"
            character_type_player2="KNIGHT"
            amount_defeats_player2="9"
            owner_player2="ratita.eth"
          />
        </div>
      </div>
    </>
  );
}
function Ended({
  character,
  avatar,
  trofeo,
  finished,
  victory_or_defeat,
  defeats,
  victories,
  owner,
  amount_defeats,
  character_type,
  amount,
  status,
  character_player2,
  avatar_player2,
  amount_victories_player2,
  owner_player2,
  amount_defeats_player2,
  character_type_player2,
}: {
  character: string;
  avatar: string;
  trofeo: string;
  finished: string;
  defeats: string;
  victories: string;
  victory_or_defeat: string;
  owner: string;
  amount_defeats: string;
  character_type: string;
  amount: string;
  status: string;
  character_player2: string;
  avatar_player2: string;
  amount_victories_player2: string;
  owner_player2: string;
  amount_defeats_player2: string;
  character_type_player2: string;
}) {
  return (
    <div className="bg-arena-bg p-8 border border-b-[0.1px] border-white/20 rounded-lg w-full  shadow-padentro ">
      <div className="div-oblicuo bg-arena-black  gradient-border relative ">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <div
          aria-dev-note="caja-contenedora-de-los-cincos-elementos-principales"
          className="  grid grid-cols-5 flex-shrink-0 pr-6 items-center justify-center  "
        >
          <div
            aria-note-dev="caja-names-points"
            className="flex flex-col mx-auto justify-center"
          >
            <div className="flex flex-row gap-2">
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
            <p className="text-4xl text-white pt-4 font-bold">
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
                  className="size-6"
                  src={defeats}
                  alt="cup"
                  width={24}
                  height={24}
                />
                <p className="text-white  text-xl">{amount_defeats}</p>
              </div>
            </div>
          </div>
          <div
            aria-dev-note="caja-imagen"
            className=" flex items-center mx-auto justify-center w-full overflow-hidden  relative"
          >
            <Image
              className="object-cover  w-full h-full "
              src={character}
              alt="champsword"
              width={1000}
              height={1000}
            />
          </div>
          <div
            aria-note-dev="caja de en medio, victoria o derrota"
            className="flex items-center   flex-col pt-4"
          >
            <div className="size-12 mb-2">
              <Image
                src={victory_or_defeat}
                alt="icon"
                width={46}
                height={40}
              />
            </div>
            <p
              className={`text-5xl font-bold ${status === "VICTORY" ? "gradient-text-victory" : "gradient-text-defeat"}`}
            >
              {status}
            </p>
            <div className="flex gap-2 items-center pt-2 pb-4">
              <p
                className={`border-r-[0.1px] text-sm px-2 ${status == "VICTORY" ? "text-green-500" : "text-red-500"} `}
              >
                {" "}
                {amount} USDC
              </p>
              <p className="text-white/50 text-xs ">{finished}</p>
            </div>

            <Button
              className="gradient-button  px-2 my-2 rounded-xl  text-arena-orange text-lg"
              variant="arena-main"
            >
              WATCH
            </Button>
          </div>
          <div
            aria-dev-note="caja-imagen"
            className=" flex items-center mx-auto justify-center w-full overflow-hidden  relative"
          >
            <Image
              className="object-cover  w-full h-full "
              src={character_player2}
              alt="champsword"
              width={400}
              height={400}
            />
          </div>
          <div
            aria-note-dev="caja-names-points"
            className="flex flex-col w-full items-end mx-auto"
          >
            <div className="flex flex-row gap-2">
              <Image
                className="size-6 border-[1px] border-orange-700 rounded-full  "
                src={avatar_player2}
                alt="champ"
                width={24}
                height={24}
              />
              <p className=" text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700  text-sm">
                {owner_player2}
              </p>
            </div>
            <p className="text-4xl text-white pt-4 font-bold">
              {character_type_player2}
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
                <p className="text-white text-xl">{amount_victories_player2}</p>
              </div>
              <div className="flex flex-row items-center gap-[5px]">
                <Image
                  className="size-6   "
                  src={defeats}
                  alt="cup"
                  width={24}
                  height={24}
                />
                <p className="text-white  text-xl">{amount_defeats_player2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
