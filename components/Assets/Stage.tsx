"use client";

import StageBar from "../Challenge/StageBar";
import AdvancedStats from "./AdvancedStats";
import DashboardAssets from "./DashboardAssets";
import NavBarAssets from "./NavBarAssets";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import NoAddress from "../Character/NoAddress";
import ModalCustomAsset from "../Character/ModalCustomAsset";

export default function Stage() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isOngoing = isActive("/assets");
  const { isConnected } = useAccount();
  return (
    <>
      <StageBar
        image="/assets.png"
        title="ASSETS"
        action={<ModalCustomAsset />}
      />
      <div className="flex md:flex-row flex-col">
        <NavBarAssets />
        {isOngoing && isConnected ? (
          <DashboardAssets />
        ) : !isConnected ? (
          <NoAddress
            title="NOTHING OVER HERE"
            description="You must connect your wallet to get started!"
          />
        ) : (
          <AdvancedStats />
        )}
      </div>
    </>
  );
}
