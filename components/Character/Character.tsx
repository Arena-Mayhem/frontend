import Image from "next/image";
import { Button } from "../ui/button";
import CreateNewChallenge from "./CreateNewChallenge";
import PayforCreate from "../Challenge/PayforCreate";

export default function Cards() {
  return (
    <>
      <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
        <div className="flex flex-col items-center justify-center w-fit gap-6">
          <Champs
            character="/wizard.png"
            victories="5"
            hp="/hp.svg"
            ap="/ap.svg"
            dp="/dp.svg"
            sp="sp.svg"
            hpoints="40"
            apoints="40"
            dpoints="10"
            spoints="10"
            trofeo="cup.svg"
            amount_defeats="2"
            character_type="wizard"
            amount="27 USDC"
          />
          <Champs
            character="/ogro.png"
            victories="5"
            hp="/hp.svg"
            ap="/ap.svg"
            dp="/dp.svg"
            sp="sp.svg"
            hpoints="25"
            apoints="25"
            dpoints="25"
            spoints="25"
            trofeo="cup.svg"
            amount_defeats="2"
            character_type="MONSTER"
            amount="14 USDC"
          />
          <Champs
            character="/knight.png"
            victories="5"
            hp="/hp.svg"
            ap="/ap.svg"
            dp="/dp.svg"
            sp="sp.svg"
            hpoints="10"
            apoints="10"
            dpoints="40"
            spoints="40"
            trofeo="cup.svg"
            amount_defeats="2"
            character_type="KNIGHT"
            amount="8 USDC"
          />
        </div>
      </div>
    </>
  );
}
function Champs({
  character,
  hp,
  dp,
  ap,
  victories,
  hpoints,
  apoints,
  dpoints,
  spoints,
  sp,
  amount_defeats,
  character_type,
  amount,
}: {
  character: string;
  hp: string;
  dp: string;
  ap: string;
  sp: string;
  victories: string;
  trofeo: string;
  hpoints: string;
  apoints: string;
  dpoints: string;
  spoints: string;
  amount_defeats: string;
  character_type: string;
  amount: string;
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
          aria-dev-note="caja-contenedora-de-los-tres-elementos"
          className="  flex justify-between  "
        >
          <div
            aria-dev-note="caja-imagen"
            className=" flex items-center mx-auto justify-center overflow-hidden  relative"
          >
            <Image
              className="object-cover w-full  h-full "
              src={character}
              alt="champsword"
              width={800}
              height={800}
            />
          </div>
          <div
            aria-note-dev="caja-names-points"
            className="flex flex-col px-8 w-full mx-auto justify-center"
          >
            {" "}
            <p className="text-4xl text-white pt-4 font-bold">
              {character_type}
            </p>
            <div className=" flex flex-row gap-8 pt-4 ">
              <p className="text-green-500 text-xl">V-{victories}</p>
              <p className="text-red-500  text-xl">L-{amount_defeats}</p>
            </div>
            <div className="flex flex-row gap-4 py-8">
              <div className="flex gap-1 items-center">
                <Image
                  className="size-6  "
                  src={hp}
                  alt="champ"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{hpoints}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Image
                  className="size-6  "
                  src={sp}
                  alt="champ"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{spoints}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Image
                  className="size-6  "
                  src={ap}
                  alt="champ"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{apoints}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Image
                  className="size-6  "
                  src={dp}
                  alt="champ"
                  width={24}
                  height={24}
                />
                <p className="text-white text-xl">{dpoints}</p>
              </div>
            </div>
          </div>
          <div
            aria-note-dev="caja-join-challenge"
            className="flex border-l  relative  items-center justify-center  div-oblicuo gradient-border-left  "
          >
            <img
              src="/square.svg"
              className="absolute top-0 left-0 pointer-events-none"
            />
            <img
              src="/square.svg"
              className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
            />
            <div
              aria-note-dev="box-contain button and profit"
              className="flex w-36 flex-grow gap-4 items-center flex-col"
            >
              <div className="hover:animate-wiggle ">
                <Image
                  className="size-20 block"
                  src="/sword.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </div>
              <div className="hover:animate-wiggle ">
                <Image
                  className="size-20"
                  src="/potion.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div
            aria-note-dev="new/edit character"
            className="flex gap-4 relative gradient-border-left items-center justify-center p-8 flex-col  div-oblicuo-final-character  "
          >
            <CreateNewChallenge />
            <Button
              className="gradient-button px-6 py-4 gap-2 text-arena-orange text-lg"
              variant="arena-main"
            >
              EDIT CHARACTER
              <Image src="/edit.svg" alt="arrow" width={20} height={20} />
            </Button>
            <p className="text-white pt-4 text-center text-sm font-bold">
              Earnings: {amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
