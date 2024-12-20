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
    <div className="flex justify-center items-center w-full">
    <div className="div-oblicuo gap-4 relative bg-arena-black gradient-border flex flex-wrap p-4 sm:p-9 m-4 sm:m-8">
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
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
    <div className="flex flex-col items-center w-full">
      <div className="h-[264px] w-full max-w-[200px]">
        <Image
          src={urlImage}
          alt={ChampName}
          height={264}
          width={200}
          className="h-full w-full bg-arena-bg object-cover rounded-2xl"
        />
      </div>
      
      <div className="flex flex-col items-center justify-center w-full max-w-[200px] mt-2">
        <p className="text-white text-center mb-2">{ChampName}</p>
        {price && (
          <Button className="gradient-border items-center justify-center flex flex-row gap-2 p-2 w-full">
            <p className="text-arena-orange">BUY FOR</p>
            <p className="text-white">{price}</p>
          </Button>
        )}
      </div>
    </div>
  );
}
