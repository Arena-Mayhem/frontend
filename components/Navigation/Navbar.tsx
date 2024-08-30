"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ImMenu } from "react-icons/im";
import { Button } from "../ui/button";
import { ButtonWallet } from "../ui/button-connectwallet";
import { usePathname } from "next/navigation";

import asset_logo from "@/public/logasion.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  const LINKS = (
    <Fragment>
      <div className="flex  w-full flex-row  justify-center flex-wrap top-0 items-center">
        <div className="flex items-center gap-4 md:gap-8 lg:gap-16">
          {/*check if active route is challenge, or challenge/history, if so then mark as active*/}
          <Button
            variant={"simple"}
            className={
              isActive("/challenge") || isActive("/challenge/history")
                ? "text-arena-orange"
                : ""
            }
            asChild
          >
            <Link href="/challenge">Challenges</Link>
          </Button>
          <Button
            variant={"simple"}
            className={
              isActive("/character") ||
              isActive("/character/inventory") ||
              isActive("/character/inventory/weapons") ||
              isActive("/character/inventory/potions")
                ? "text-arena-orange"
                : ""
            }
            asChild
          >
            <Link href="/character">Character</Link>
          </Button>
        </div>
        <div className="flex flex-grow items-center justify-center gap-4 md:gap-8 lg:gap-16 h-[80px] ">
          <Link className="w-[301px] relative h-full" href="/">
            <Image
              src={asset_logo}
              alt=""
              className="absolute top-0 left-0 drop-shadow-pafuera lg:flex hidden w-full"
            />
          </Link>
        </div>

        <div className="flex items-center  gap-4 md:gap-8 lg:gap-16">
          <Button
            variant={"simple"}
            className={
              isActive("/assets") || isActive("/assets/balance")
                ? "text-arena-orange"
                : ""
            }
            asChild
          >
            <Link href="/assets">Assets</Link>
          </Button>
          <Button
            variant={"simple"}
            className={
              isActive("/marketplace") ||
              isActive("/marketplace/weapons") ||
              isActive("/marketplace/potions") ||
              isActive("/marketplace/random")
                ? "text-arena-orange"
                : ""
            }
            asChild
          >
            <Link href="/marketplace">Marketplace</Link>
          </Button>

          <ButtonWallet />
        </div>
      </div>
      {/*<Champ />*/}
    </Fragment>
  );

  return (
    <section className=" w-full  flex-shrink-0 justify-center  top-0 z-[1] flex flex-col lg:flex-row ">
      <nav className="!z-50 bg-arena-bg shadow-padentro border-b-[0.1px] border-white/20 flex justify-center w-full">
        <div className="items-center gap-16 justify-center hidden lg:flex">
          {LINKS}
        </div>
        <button
          type="button"
          className="lg:hidden mx-auto p-8"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ImMenu className="text-xl text-arena-orange fill-current" />
        </button>
      </nav>
      <section
        className={`flex-col  items-center py-1 [&_button]:underline [&_button]:underline-offset-8 rounded-lg drop-shadow-lg bg-arena-orange/20 backdrop-blur-lg border-white   lg:hidden ${
          isOpen ? "flex " : "hidden"
        }`}
      >
        {LINKS}
      </section>
    </section>
  );
}
