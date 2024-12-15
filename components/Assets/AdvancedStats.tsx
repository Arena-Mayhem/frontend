import Image from "next/image";
import Stats from "./Stats";

export default function AdvancedStats() {
  const wins = 10;
  const games = 20;
  return (
    <div className="bg-arena-bg p-8 m-8 border border-b-[0.1px] border-white/20 rounded-lg w-full shadow-padentro  ">
      <div className="div-oblicuo p-8 bg-arena-black  gradient-border relative border-b-2">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />
        <Stats wins={wins} games={games} />
      </div>
    </div>
  );
}
