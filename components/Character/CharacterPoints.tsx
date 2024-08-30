import { GiRunningNinja, GiPointySword, GiShoulderArmor } from "react-icons/gi";
import { BsFillHeartPulseFill } from "react-icons/bs";

export default function CharacterPoints() {
  return (
    <>
      <div
        aria-note-dev="caja-main-container"
        className="flex flex-row items-center py-8 justify-center"
      >
        <div aria-note-dev="caja-container-speed-atack" className="  w-full  ">
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
            <GiRunningNinja className="text-arena-orange" size="30px" />
            <p className="text-white">SPEED</p>

            <input
              className=" font-light  border-orange-400 border-[1px] rounded-md   py-1 text-center w-24 text-white bg-transparent "
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
              className="absolute rotate-180 bottom-0 pointer-events-none right-0"
            />
            <GiPointySword className="text-arena-orange" size="30px" />
            <p className="text-white">ATACK</p>
            <input
              className=" font-light  border-orange-400 border-[1px] rounded-md   py-1 text-center w-24 text-white bg-transparent "
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
              className="absolute rotate-180 bottom-0 pointer-events-none right-0"
            />
            <GiShoulderArmor className="text-arena-orange" size="30px" />
            <p className="text-white">
              <p>DEFENSE</p>
            </p>
            <input
              className=" font-light  border-orange-400 border-[1px] rounded-md   py-1 text-center w-24 text-white bg-transparent "
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
              className="absolute rotate-180 bottom-0 pointer-events-none right-0"
            />
            <BsFillHeartPulseFill className="text-arena-orange" size="30px" />
            <p className="text-white">HEALTH</p>
            <input
              className=" font-light  border-orange-400 border-[1px] rounded-md   py-1 text-center w-24 text-white bg-transparent "
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
    </>
  );
}
