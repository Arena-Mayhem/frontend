import InventoryBar from "./InventoryBar";
import { usePathname } from "next/navigation";
import SkinsCards from "./Skins";
import PotionsCards from "./Potions";
import WeaponsCards from "./Weapons";

export default function Inventory() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isOngoing = isActive("/character/inventory");
  const isWeapons = isActive("/character/inventory/weapons");
  const isPotions = isActive("/character/inventory/potions");
  return (
    <>
      <div className="bg-arena-bg bg-cover p-0 sm:p-8 border border-b mx-auto sm:m-8 border-white/20 rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] shadow-padentro mb-2 mt-4">
        <InventoryBar />
        <div className="flex items-start justify-start">
          {isOngoing ? (
            <SkinsCards />
          ) : isWeapons ? (
            <WeaponsCards />
          ) : isPotions ? (
            <PotionsCards />
          ) : null}
        </div>
      </div>
    </>
  );
}
