"use client";

import Stats from "./Stats";

export default function AdvancedStats() {
  const wins = 10;
  const games = 20;
  return (
    <div className=" lg:w-full overflow-x-hidden md:bg-arena-bg lg:p-8 lg:m-8 lg:border lg:border-b md:shadow-padentrobg-arena-bg bg-cover p-0 sm:p-8 md:border md:border-b mx-auto sm:m-8 md:border-white/20 md:rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] md:shadow-padentro mb-2 mt-4">
      <div className="div-oblicuo p-8 bg-arena-black gradient-border relative border-b-2">
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
