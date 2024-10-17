"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import Character from "./Character";
import StageBar from "../Challenge/StageBar";
import NavBarCharacter from "./NavBarCharacter";
import Inventory from "./Inventory/Inventory";
import CreateNew from "./CreateNew";
import NoAddress from "./NoAddress";

export default function Stage() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isInventory = pathname.startsWith("/character/inventory");

  return (
    <>
      <StageBar
        action={
          <CreateNew
            trigger={
              <Button variant="simple" className="text-white gap-3">
                Create New Character
                <Image
                  src="/plus.svg"
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-[24px] h-[24px] "
                />
              </Button>
            }
          />
        }
        image="/charactericon.svg"
        title="CHARACTER"
      />
      <div className="flex md:flex-row flex-col">
        <NavBarCharacter />
        {!isConnected ? (
          <NoAddress
            title="NOTHING OVER HERE"
            description="You must connect your wallet to get started!"
          />
        ) : isInventory ? (
          <Inventory />
        ) : (
          <Character />
        )}
      </div>
    </>
  );
}
