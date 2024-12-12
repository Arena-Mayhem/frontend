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
      <div className="flex flex-col bg-arena-bg border-b-[0.1px] border-white/20 shadow-padentro rounded-xl p-8 m-8 bg-no-repeat">
        <InventoryBar />
        <div className="flex items-left justify-left">
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
