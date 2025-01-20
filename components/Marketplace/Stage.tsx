"use client";
import StageBar from "../Challenge/StageBar";
import SkinsCards from "../Character/Inventory/Skins";
import WeaponsCards from "../Character/Inventory/Weapons";
import NavBarMarketplace from "./NavBarMarketplace";
import { usePathname } from "next/navigation";
import PotionsCards from "../Character/Inventory/Potions";
import { useAccount } from "wagmi";
import RandomBoxStage from "@/components/Marketplace/RandomBox/RandomBoxStage";
import NoAddress from "../Character/NoAddress";

const RenderContent = () => {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return isConnected ? (
    isActive("/marketplace") ? (
      <>
        <div className="bg-arena-bg bg-cover p-0 sm:p-8 border border-b mx-auto sm:m-8 border-white/20 rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] shadow-padentro mb-2 mt-4">
          <SkinsCards />{" "}
        </div>
      </>
    ) : isActive("/marketplace/weapons") ? (
      <>
        <div className="bg-arena-bg bg-cover p-0 sm:p-8 border border-b mx-auto sm:m-8 border-white/20 rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] shadow-padentro mb-2 mt-4">
          <WeaponsCards />{" "}
        </div>
      </>
    ) : isActive("/marketplace/potions") ? (
      <>
        <div className="bg-arena-bg bg-cover p-0 sm:p-8 border border-b mx-auto sm:m-8 border-white/20 rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] shadow-padentro mb-2 mt-4">
          <PotionsCards />{" "}
        </div>
      </>
    ) : isActive("/marketplace/random") ? (
      <>
        <div className="flex flex-col bg-arena-bg border-b-[0.1px] border-white/20 shadow-padentro rounded-xl p-8 m-8 bg-cover w-[1100px]">
          <RandomBoxStage />
        </div>
      </>
    ) : null
  ) : (
    <NoAddress
      title="NOTHING OVER HERE"
      description="You must connect your wallet to get started!"
    />
  );
};
export default function Stage() {
  return (
    <>
      <StageBar image="/charactericon.svg" title="MARKETPLACE" />
      <div className="flex md:flex-row flex-col">
        <NavBarMarketplace />
        {RenderContent()}
      </div>
    </>
  );
}
