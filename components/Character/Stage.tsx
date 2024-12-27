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
              <Button variant="simple" className="pt-3.5 text-sm md:text-base text-yellow-400 md:text-white flex flex-row items-center justify-end w-full md:w-auto">
                <div className="flex">
                <span className="block md:hidden">New Character</span>
                <span className="hidden md:block">Create New Character</span>
                <Image
                  src="/plus.svg"
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-4 h-4 md:w-6 md:h-6"
                />
                </div>
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
