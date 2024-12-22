"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, PropsWithChildren, useState } from "react";
import { ImMenu, ImCross } from "react-icons/im";
import { Button } from "../ui/button";
import { ButtonWallet } from "../ui/button-connectwallet";
import { usePathname } from "next/navigation";

import asset_logo from "@/public/logasion.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isRootPath = pathname === "/";

  const DesktopLinks = () => (
    <div className="flex w-full items-center">
      <div className="flex px-4 w-[calc(50vw-10rem)] items-center justify-center gap-4 md:gap-8 lg:gap-16">
        <NavItem
          href="/challenge"
          isActive={isRootPath || pathname.startsWith("/challenge")}
        >
          Challenges
        </NavItem>
        <NavItem href="/character" isActive={pathname.startsWith("/character")}>
          Character
        </NavItem>
      </div>

      <div className="flex flex-grow items-center justify-center gap-4 md:gap-8 lg:gap-16 h-[80px]">
        <Link className="w-[18rem] relative h-full" href="/">
          <Image
            src={asset_logo}
            alt=""
            className="absolute top-0 left-0 drop-shadow-pafuera w-full"
          />
        </Link>
      </div>

      <div className="flex px-4 w-[calc(50vw-10rem)] items-center justify-center gap-4 md:gap-8 lg:gap-16">
        <NavItem href="/assets" isActive={pathname.startsWith("/assets")}>
          Assets
        </NavItem>
        <NavItem
          href="/marketplace"
          isActive={pathname.startsWith("/marketplace")}
        >
          Marketplace
        </NavItem>
        <ButtonWallet />
      </div>
    </div>
  );

  const MobileLinks = () => (
    <div className="flex flex-col w-full">
      <div className="w-full border-b border-white/10 transition-colors hover:bg-white/5">
        <div className="py-4">
          <NavItem
            href="/challenge"
            isActive={isRootPath || pathname.startsWith("/challenge")}
          >
            Challenges
          </NavItem>
        </div>
      </div>
      <div className="w-full border-b border-white/10 transition-colors hover:bg-white/5">
        <div className="py-4">
          <NavItem
            href="/character"
            isActive={pathname.startsWith("/character")}
          >
            Character
          </NavItem>
        </div>
      </div>
      <div className="w-full border-b border-white/10 transition-colors hover:bg-white/5">
        <div className="py-4">
          <NavItem href="/assets" isActive={pathname.startsWith("/assets")}>
            Assets
          </NavItem>
        </div>
      </div>
      <div className="w-full border-b border-white/10 transition-colors hover:bg-white/5">
        <div className="py-4">
          <NavItem
            href="/marketplace"
            isActive={pathname.startsWith("/marketplace")}
          >
            Marketplace
          </NavItem>
        </div>
      </div>
      <div className="w-full flex justify-center transition-colors hover:bg-white/5">
        <div className="py-4">
          <ButtonWallet />
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full flex-shrink-0 justify-center top-0 z-[1] flex flex-col">
      <nav className="!z-50 bg-arena-bg shadow-padentro border-b-[0.1px] border-white/20 flex justify-center w-full">
        <div className="items-center max-w-screen-2xl mx-auto gap-16 justify-center hidden lg:flex w-full">
          <DesktopLinks />
        </div>
        <div className="flex items-center justify-between w-full px-4 lg:hidden">
          <button
            type="button"
            className="justify-center items-center flex"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ImCross className="ml-5 text-xl text-arena-orange fill-current" />
            ) : (
              <ImMenu className="ml-5 text-xl text-arena-orange fill-current" />
            )}
          </button>
          <Link className="ml-6 w-48 h-20" href="/">
            <Image
              src={asset_logo}
              alt=""
              className="justify-center w-full"
            />
          </Link>
          <ButtonWallet size="mobile" />
        </div>
      </nav>
      <section
        className={`flex-col items-center w-full [&_button]:underline [&_button]:underline-offset-8 drop-shadow-lg bg-arena-bg border-b border-white/20 lg:hidden ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <MobileLinks />
      </section>
    </section>
  );
}

function NavItem({
  href,
  children,
  isActive,
}: PropsWithChildren<{
  href: string;
  isActive?: boolean;
}>) {
  return (
    <Button
      variant="simple"
      className={`${isActive ? "text-arena-orange" : ""} w-full lg:w-auto`}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
