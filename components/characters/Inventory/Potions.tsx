"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PotionsCards() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isInventory = isActive("/character/inventory/potions");

  const availablePotions = [
    { image: "/potionred.svg", name: "HEALTH", owned: true },
    { image: "/purplepotion.svg", name: "SPEED", owned: true },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
    { image: "/potionlock.svg", name: "locked", owned: false },
  ];

  return (
    <div className="flex justify-center items-center w-full">
      <div className="div-oblicuo gap-4 relative bg-arena-black gradient-border flex flex-wrap p-4  sm:p-9 m-4 sm:m-8">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
          alt="decorative square"
        />
        <img
          src="/square.svg"
          className="absolute bottom-0 right-0 rotate-180 pointer-events-none"
          alt="decorative square"
        />

        <div className="mx-1 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-10 w-full auto-rows-[minmax(min-content,max-content)]">
          {availablePotions.map((potion, index) => (
            <Potions
              key={index}
              urlImage={potion.image}
              PotionName={potion.name}
              isInventory={isInventory}
              owned={potion.owned}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Potions({
  urlImage,
  PotionName,
  isInventory,
  owned,
}: {
  urlImage: string;
  PotionName: string;
  isInventory: boolean;
  owned: boolean;
}) {
  return (
    <div className="flex flex-col m-2 items-center justify-center min-w-[80px]">
      <div className="w-20 h-20 lg:w-24 lg:h-24 min-w-[80px] min-h-[80px]">
        <Image
          src={urlImage}
          alt={PotionName}
          height={80}
          width={80}
          className="w-full h-full bg-arena-bg object-contain overflow-hidden rounded-2xl"
        />
      </div>
      <p className="text-white text-center py-2 text-sm">{PotionName}</p>
      {!isInventory && (
        <Button
          disabled={owned}
          className={`items-center justify-center flex flex-row gap-2 p-2 w-full max-w-[180px] text-sm
            ${
              owned
                ? "gradient-border-gray cursor-default"
                : "gradient-border hover:bg-yellow-600/10"
            }`}
        >
          <p className={`${owned ? "text-gray-400" : "text-arena-orange"}`}>
            {owned ? "owned" : "30 USDC"}
          </p>
        </Button>
      )}
    </div>
  );
}
