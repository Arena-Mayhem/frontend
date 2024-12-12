import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SkinsCards() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isInventory = isActive("/character/inventory");

  const availableSkins = [
    { image: "/giant_troll.png", name: "giant troll" },
    { image: "/knight.png", name: "medival knight" },
    { image: "/shaman.png", name: "shaman" },
    { image: "/locked.png", name: "locked" },
    { image: "/locked.png", name: "locked" },
    { image: "/locked.png", name: "locked" },
    { image: "/locked.png", name: "locked" },
    { image: "/locked.png", name: "locked" },
  ];

  return (
    <div className="div-oblicuo-inventory gap-2 relative bg-arena-black gradient-border flex flex-wrap justify-left p-9 m-8 flex-row">
      <img
        src="/square.svg"
        className="absolute top-0 left-0 pointer-events-non"
      />
      <img
        src="/square.svg"
        className="rotate-180 absolute bottom-0 right-0 pointer-events-non"
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-left">
        {availableSkins.map((skin, index) => (
          <Skins
            key={index}
            urlImage={skin.image}
            ChampName={skin.name}
            price={!isInventory ? "30USDC" : undefined}
          />
        ))}
      </div>
    </div>
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
          className="h-[264px] w-[200px] bg-arena-bg object-cover overflow-hidden rounded-2xl"
        />
        <p className="text-white text-center py-2">{ChampName}</p>
        {price && (
          <Button className="gradient-border items-center justify-center flex flex-row gap-2 p-2 w-[200px]">
            <p className="text-arena-orange">BUY FOR</p>
            <p className="text-white">{price}</p>
          </Button>
        )}
      </div>
    </>
  );
}
