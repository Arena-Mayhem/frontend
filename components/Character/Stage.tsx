"use client";
import Character from "./Character";
import StageBar from "../Challenge/StageBar";
import NavBarCharacter from "./NavBarCharacter";
import { usePathname } from "next/navigation";
import Inventory from "./Inventory/Inventory";
import CreateNew from "./CreateNew";
import { useAccount } from "wagmi";
import NoAddress from "./NoAddress";

export default function Stage() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isOngoing = isActive("/character");
  const { isConnected } = useAccount();
  return (
    <>
      <StageBar
        action={<CreateNew />}
        image="/charactericon.svg"
        title="CHARACTER"
      />
      <div className="flex md:flex-row flex-col">
        <NavBarCharacter />
        {isOngoing && isConnected ? (
          <Character />
        ) : !isConnected ? (
          <NoAddress
            imageUrl="/woodensword.svg"
            tittle="NOTHING OVER HERE"
            description="You must create your first character to get started!"
          />
        ) : (
          <Inventory />
        )}
      </div>
    </>
  );
}
