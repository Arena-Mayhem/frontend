import { toFinitePositive } from "@/lib/numbers";
import Image from "next/image";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { GiPointySword } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { GiShoulderArmor } from "react-icons/gi";

// TODO: Unify with components/Character/CharacterPoints.tsx

export type GenericOnChangeHandlers = {
  onChangeSpeed: (value: number) => void;
  onChangeAtack: (value: number) => void;
  onChangeDefense: (value: number) => void;
  onChangeHealth: (value: number) => void;
};

export default function ModalPlayer({
  type,
  avatar,
  amount_defeats,
  onChangeAtack,
  onChangeDefense,
  onChangeHealth,
  onChangeSpeed,
  victories,
}: {
  type: string;
  avatar: string;
  amount_defeats: string;
  victories: string;
} & Partial<GenericOnChangeHandlers>) {
  return (
    <article className="flex flex-row mx-auto bg-arena-black w-full  items-center justify-center  rounded-2xl ">
      <div className="rounded-[55px] bg-arena-bg items-center flex justify-center">
        <Image
          className=" rounded-xl w-[260px] object-cover h-[350px]"
          width={150}
          height={321}
          src={avatar}
          alt=""
        />
      </div>
      <div className=" flex flex-row-reverse items-center justify-between py-2 gap-16 ">
        <div className="flex flex-col gap-2 justify-between">
          <div className=" text-3xl text-white px-4 w-full uppercase">
            {type}
          </div>
          <div className=" flex flex-row gap-8 p-4 ">
            <p className="text-green-500 text-xl">V-{victories}</p>
            <p className="text-red-500  text-xl">L-{amount_defeats}</p>
          </div>
          <div
            aria-note-dev="caja-main-container"
            className="flex flex-row items-center justify-center"
          >
            <div
              aria-note-dev="caja-container-speed-atack"
              className="  w-full  "
            >
              <div
                aria-note-dev="pack-text-icon"
                className="flex gap-2 div-oblicuo-cajita relative m-4 items-center justify-center gradient-border p-4 flex-row"
              >
                <img
                  src="/square.svg"
                  className="absolute top-0 -left-0 pointer-events-none"
                />
                <img
                  src="/square.svg"
                  className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
                />
                <GiRunningNinja className="text-arena-orange" size="30px" />
                <p className="text-white">SPEED</p>

                <input
                  className="outline-none font-light border-orange-400 border-[1px] rounded-md  py-1 text-center w-24 text-white bg-transparent"
                  onChange={(e) =>
                    onChangeSpeed?.(toFinitePositive(parseInt(e.target.value)))
                  }
                  placeholder="30"
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  type="text"
                />
              </div>
              <div
                aria-note-dev="pack-text-icon"
                className="flex gap-2 div-oblicuo-cajita relative m-4 items-center justify-center gradient-border p-4 flex-row"
              >
                <img
                  src="/square.svg"
                  className="absolute top-0 -left-0 pointer-events-none"
                />
                <img
                  src="/square.svg"
                  className="absolute pointer-events-none rotate-180 bottom-0 right-0"
                />
                <GiPointySword className="text-arena-orange" size="30px" />
                <p className="text-white">ATACK</p>
                <input
                  className="outline-none font-light  border-orange-400 border-[1px] rounded-md   py-1 text-center w-24 text-white bg-transparent "
                  onChange={(e) =>
                    onChangeAtack?.(toFinitePositive(parseInt(e.target.value)))
                  }
                  placeholder="30"
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  type="text"
                />
              </div>
            </div>
            <div aria-note-dev="caja-container-def-life" className="w-full">
              <div
                aria-note-dev="pack-text-icon"
                className="flex gap-2 div-oblicuo-cajita relative m-4 items-center justify-center gradient-border p-4 flex-row"
              >
                <img
                  src="/square.svg"
                  className="absolute top-0 -left-0 pointer-events-none"
                />
                <img
                  src="/square.svg"
                  className="absolute rotate-180 pointer-events-none bottom-0 right-0"
                />
                <GiShoulderArmor className="text-arena-orange" size="30px" />
                <p className="text-white">
                  <p>DEFENSE</p>
                </p>
                <input
                  className="outline-none font-light  border-orange-400 border-[1px] rounded-md   py-1 text-center w-24 text-white bg-transparent "
                  onChange={(e) =>
                    onChangeDefense?.(
                      toFinitePositive(parseInt(e.target.value)),
                    )
                  }
                  placeholder="30"
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  type="text"
                />
              </div>
              <div
                aria-note-dev="pack-text-icon"
                className="flex gap-2 div-oblicuo-cajita relative m-4 items-center justify-center gradient-border p-4 flex-row"
              >
                <img
                  src="/square.svg"
                  className="absolute top-0 -left-0 pointer-events-none"
                />
                <img
                  src="/square.svg"
                  className="absolute rotate-180 pointer-events-none bottom-0 right-0"
                />
                <BsFillHeartPulseFill
                  className="text-arena-orange"
                  size="30px"
                />
                <p className="text-white">HEALTH</p>
                <input
                  className="outline-none font-light  border-orange-400 border-[1px] rounded-md   py-1 text-center w-24 text-white bg-transparent "
                  onChange={(e) =>
                    onChangeHealth?.(toFinitePositive(parseInt(e.target.value)))
                  }
                  placeholder="30"
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}