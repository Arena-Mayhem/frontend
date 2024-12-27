import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WeaponsCards() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isInventory = isActive("/character/inventory/weapons");

  const availableWeapons = [
    { image: "/ironsword.svg", name: "sword" },
    { image: "/clasicspare.svg", name: "spare" },
    { image: "/basicaxe.svg", name: "axe" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
    { image: "/lock_weapon.png", name: "locked" },
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full auto-rows-[minmax(min-content,max-content)]">
          {availableWeapons.map((weapon, index) => (
            <Weapons
              key={index}
              urlImage={weapon.image}
              WeaponName={weapon.name}
              price={!isInventory ? "30USDC" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Weapons({
  urlImage,
  WeaponName,
  price,
}: {
  urlImage: string;
  WeaponName: string;
  price?: string;
}) {
  return (
    <div className="flex flex-col m-2 items-center justify-center min-w-[80px]">
      <div className="w-20 h-20 min-w-[80px] min-h-[80px]">
        <Image
          src={urlImage}
          alt={WeaponName}
          height={80}
          width={80}
          className="w-full h-full bg-arena-bg object-contain overflow-hidden rounded-2xl"
        />
      </div>
      <p className="text-white text-center py-2 text-sm">{WeaponName}</p>
      {price && (
        <Button className="gradient-border items-center justify-center flex flex-row gap-2 p-2 w-full max-w-[180px] text-sm">
          <p className="text-arena-orange">BUY FOR</p>
          <p className="text-white">{price}</p>
        </Button>
      )}
    </div>
  );
}
