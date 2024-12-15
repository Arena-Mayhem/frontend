import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PotionsCards() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isInventory = isActive("/character/inventory/potions");
  return (
    <>
      <div className="div-oblicuo gap-7  relative pt-8 bg-arena-black gradient-border flex flex-wrap justify-center  w-full m-8 flex-row">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 pointer-events-none right-0"
        />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 justify-center">
          {isInventory ? (
            <>
              <Potions urlImage="/potionred.svg" PotionName=" HEALTH" />
              <Potions urlImage="/purplepotion.svg" PotionName="SPEED" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
              <Potions urlImage="/potionlock.svg" PotionName="locked" />
            </>
          ) : (
            <>
              <Potions
                urlImage="/potionred.svg"
                PotionName="HEALTH"
                price="30USDC"
              />
              <Potions
                urlImage="/purplepotion.svg"
                PotionName="SPEED"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
              <Potions
                urlImage="/potionlock.svg"
                PotionName="locked"
                price="30USDC"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Potions({
  urlImage,
  PotionName,
  price,
}: {
  urlImage: string;
  PotionName: string;
  price?: string;
}) {
  return (
    <>
      <div className="flex flex-col m-4 items-center justify-center">
        <Image
          src={urlImage}
          alt={PotionName}
          height={100}
          width={100}
          className="size-20 bg-arena-bg object-contain  overflow-hidden rounded-2xl"
        />
        <p className="text-white text-center py-2">{PotionName}</p>
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
