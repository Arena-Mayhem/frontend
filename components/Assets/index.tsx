"use client";

import AdvancedStats from "./AdvancedStats";
import DashboardAssets from "./DashboardAssets";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import NoAddress from "../Character/NoAddress";

export default function SectionAssets() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isOngoing = isActive("/assets");
  const { isConnected } = useAccount();
  return isOngoing && isConnected ? (
    <DashboardAssets />
  ) : !isConnected ? (
    <NoAddress
      title="NOTHING TO SEE HERE"
      description="Please connect before you continue"
    />
  ) : (
    <AdvancedStats />
  );
}
