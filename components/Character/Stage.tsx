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
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isOngoing = isActive("/character");
  const { isConnected } = useAccount();
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
