"use client";

import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";

import Character from "./Character";
import Inventory from "./Inventory/Inventory";
import NoAddress from "./NoAddress";

export default function SectionCharacter() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isInventory = pathname.startsWith("/character/inventory");

  return !isConnected ? (
    <NoAddress
      title="NOTHING TO SEE HERE"
      description="You must connect your wallet to get started!"
    />
  ) : isInventory ? (
    <Inventory />
  ) : (
    <Character />
  );
}
