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
      <div className="md:overflow-x-auto">
      <div className="md:min-w-[400px]"> 
        <div className="flex items-center justify-between md:pt-2 lg:py-2 w-full md:px-4">
        <h1 className="text-xl md:hidden text-white">
  ADVANCED<br />STATS
</h1>
          <h1 className="hidden md:block text-4xl text-white">ADVANCED STATS</h1>
          
          <div
            aria-note-dev="container wins and games"
            className="flex flex-col xl:flex-row justify-between gap-4 items-center "
          >
            <div className="flex items-center gap-2 md:px-8 xl:border-r">
            <Image 
  src="/ap.svg" 
  alt="assets" 
  width={23} 
  height={23}
  className="md:w-[35px] md:h-[35px] pb-1"
/>
              <p className="text-white text-xs md:text-base ">games: {games}</p>
            </div>
            
            <div className="flex items-center gap-2 md:px-4">
            <div className="w-[23px] h-[23px] md:w-[35px] md:h-[35px]">
  <IconCup />
</div>
              <p className="text-white text-xs md:text-base">wins: {wins}</p>
            </div>
          </div>
        </div>
        <div className="border-t-arena-orange border-t mt-8 md:mt-4 hidden lg:block"></div>
        <div className="flex flex-col xl:flex-row gap-4 pt-4 md:pt-12 -ml-3 -mr-3 md:-ml-0 md:-mr-0">
          <Profits data={profitsData} />
          <Losses data={profitsData} />
        </div>
        <div className=" w-full flex items-center justify-end pt-4">
          <ShareTwitter />
        </div>
      </div>
      </div>
    </>
  );
}
