"use client";

import AdvancedStats from "./AdvancedStats";
import DashboardAssets from "./DashboardAssets";
import NavBarAssets from "./NavBarAssets";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import NoAddress from "../Character/NoAddress";

export default function Stage() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isOngoing = isActive("/assets");
  const { isConnected } = useAccount();
  return (
    <div className="flex md:flex-row flex-col">
      <NavBarAssets />
      {isOngoing && isConnected ? (
        <DashboardAssets />
      ) : !isConnected ? (
        <NoAddress
          title="NOTHING TO SEE HERE"
          description="Please connect before you continue"
        />
      ) : (
        <AdvancedStats />
      )}
    </div>
  );
}
