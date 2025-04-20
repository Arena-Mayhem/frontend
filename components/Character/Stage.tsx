"use client";

import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";

import Character from "./Character";
import NavBarCharacter from "./NavBarCharacter";
import Inventory from "./Inventory/Inventory";
import NoAddress from "./NoAddress";

export default function Stage() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isInventory = pathname.startsWith("/character/inventory");

  return (
    <div className="flex md:flex-row flex-col">
      <NavBarCharacter />
      {!isConnected ? (
        <NoAddress
          title="NOTHING TO SEE HERE"
          description="You must connect your wallet to get started!"
        />
      ) : isInventory ? (
        <Inventory />
      ) : (
        <Character />
      )}
    </div>
  );
}
