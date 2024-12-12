import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WeaponsCards() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isInventory = isActive("/character/inventory/weapons");
  return (
    <>
      <div className="div-oblicuo-inventory gap-2 relative pt-2 bg-arena-black gradient-border flex flex-wrap justify-left p-9 m-8 flex-row">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 pointer-events-none bottom-0 right-0"
        />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 justify-center">
          {isInventory ? (
            <>
              <Weapons urlImage="/ironsword.svg" WeaponName="sword" />
              <Weapons urlImage="/clasicspare.svg" WeaponName="spare" />
              <Weapons urlImage="/basicaxe.svg" WeaponName="axe" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
              <Weapons urlImage="/lock_weapon.png" WeaponName="locked" />
            </>
          ) : (
            <>
              <Weapons
                urlImage="/ironsword.svg"
                WeaponName="SWORD"
                price="30USDC"
              />
              <Weapons
                urlImage="/clasicspare.svg"
                WeaponName="SPARE"
                price="30USDC"
              />
              <Weapons
                urlImage="/basicaxe.svg"
                WeaponName="AXE"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
              <Weapons
                urlImage="/lock_weapon.png"
                WeaponName="locked"
                price="30USDC"
              />
            </>
          )}
        </div>
      </div>
    </>
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
    <>
      <div className="flex flex-col m-4 items-center justify-center">
        <Image
          src={urlImage}
          alt={WeaponName}
          height={100}
          width={100}
          className="size-20 bg-arena-bg object-contain  overflow-hidden rounded-2xl"
        />
        <p className="text-white text-center py-2">{WeaponName}</p>
        {price && (
          <Button className="gradient-border items-center justify-center flex flex-row gap-2 p-2 w-[180px]">
            <p className="text-arena-orange">BUY FOR</p>
            <p className="text-white">{price}</p>
          </Button>
        )}
      </div>
    </>
  );
}
