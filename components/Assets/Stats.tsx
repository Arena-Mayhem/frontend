import Image from "next/image";
import { useState, useEffect } from "react";

import IconCup from "@/components/icons/IconCup";

import Losses from "./Losses";
import Profits from "./Profits";
import ShareTwitter from "./ShareTwitter";

export default function Stats({
  wins,
  games,
}: {
  wins: number;
  games: number;
}) {
  const [profitsData, setProfitsData] = useState([]);

  useEffect(() => {
    fetch("/profit.json")
      .then((response) => response.json())
      .then((data) => setProfitsData(data))
      .catch((error) => console.error("Error fetching profits data:", error));
  }, []);

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-white">ADVANCED STATS</h1>
          <div
            aria-note-dev="container wins and games"
            className="flex justify-between  gap-4 items-center"
          >
            <div className="flex items-center gap-2 px-8 border-r-[1px]">
              <Image src="/ap.svg" alt="assets" width={35} height={35} />
              <p className="text-white">Games: {games}</p>
            </div>
            <div className="flex items-center gap-2 px-4">
              <IconCup />
              <p className="text-white">Wins: {wins}</p>
            </div>
          </div>
        </div>
        <div className="border-t-arena-orange border-t-[1px] mt-8"></div>
        <div className="flex flex-row gap-4 pt-8">
          <Profits data={profitsData} />
          <Losses data={profitsData} />
        </div>
        <div className=" w-full flex items-center justify-end pt-4">
          <ShareTwitter />
        </div>
      </div>
    </>
  );
}
