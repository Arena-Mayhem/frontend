import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SkinsCards() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isInventory = isActive("/character/inventory");
  return (
    <>
      <div className="div-oblicuo-inventory gap-6 relative pt-8 bg-arena-black gradient-border flex flex-wrap justify-center p-8 m-8 flex-row">
        <img
          src="/square.svg"
          className="absolute top-0 left-0  pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 pointer-events-none bottom-0 right-0"
        />
        {isInventory ? (
          <>
            <Skins urlImage="/knight.png" ChampName="KNIGHT" />
            <Skins urlImage="/barak.png" ChampName="BARAK" />
            <Skins urlImage="/shaman.png" ChampName="SHAMAN" />
            <Skins urlImage="/locked.png" ChampName="locked" />
            <Skins urlImage="/locked.png" ChampName="locked" />
            <Skins urlImage="/locked.png" ChampName="locked" />
            <Skins urlImage="/locked.png" ChampName="locked" />
            <Skins urlImage="/locked.png" ChampName="locked" />
          </>
        ) : (
          <>
            <Skins urlImage="/knight.png" ChampName="KNIGHT" price="30USDC" />
            <Skins urlImage="/barak.png" ChampName="BARAK" price="30USDC" />
            <Skins urlImage="/shaman.png" ChampName="SHAMAN" price="30USDC" />
            <Skins urlImage="/locked.png" ChampName="locked" price="30USDC" />
            <Skins urlImage="/locked.png" ChampName="locked" price="30USDC" />
            <Skins urlImage="/locked.png" ChampName="locked" price="30USDC" />
            <Skins urlImage="/locked.png" ChampName="locked" price="30USDC" />
            <Skins urlImage="/locked.png" ChampName="locked" price="30USDC" />
          </>
        )}
      </div>
    </>
  );
}

function Skins({
  urlImage,
  ChampName,
  price,
}: {
  urlImage: string;
  ChampName: string;
  price?: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={urlImage}
          alt={ChampName}
          height={100}
          width={100}
          className="h-[269px] w-[190px] bg-arena-bg object-cover overflow-hidden rounded-2xl"
        />
        <p className="text-white text-center py-2">{ChampName}</p>
        {price && (
          <Button className="gradient-border items-center justify-center flex flex-row gap-2 p-2 w-[190px]">
            <p className="text-arena-orange">BUY FOR</p>
            <p className="text-white">{price}</p>
          </Button>
        )}
      </div>
    </>
  );
}
