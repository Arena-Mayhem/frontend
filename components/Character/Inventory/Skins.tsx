import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SkinsCards() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isInventory = isActive("/character/inventory");

  const availableSkins = [
    { image: "/giant_troll.png", name: "giant troll", owned: true },
    { image: "/knight.png", name: "medival knight", owned: true },
    { image: "/shaman.png", name: "shaman", owned: true },
    { image: "/locked.png", name: "locked", owned: false },
    { image: "/locked.png", name: "locked", owned: false },
    { image: "/locked.png", name: "locked", owned: false },
    { image: "/locked.png", name: "locked", owned: false },
    { image: "/locked.png", name: "locked", owned: false },
  ];

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="div-oblicuo gap-6 relative bg-arena-black gradient-border flex flex-wrap p-4 sm:p-10 m-4 sm:m-8">
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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {availableSkins.map((skin, index) => (
            <Skins
              key={index}
              urlImage={skin.image}
              ChampName={skin.name}
              isInventory={isInventory}
              owned={skin.owned}
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
  isInventory,
  owned,
}: {
  urlImage: string;
  ChampName: string;
  isInventory: boolean;
  owned: boolean;
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
        {!isInventory && (
        <Button 
          disabled={owned}
          className={`items-center justify-center flex flex-row gap-2 p-2 w-full max-w-[180px] text-sm
            ${owned 
              ? 'gradient-border-gray cursor-default' 
              : 'gradient-border hover:bg-yellow-600/10'
            }`}
        >
          <p className={`${owned ? 'text-gray-400' : 'text-arena-orange'}`}>
            {owned ? 'owned' : '30 USDC'}
          </p>
        </Button>
      )}
    </div>
    </div>
  );
}
