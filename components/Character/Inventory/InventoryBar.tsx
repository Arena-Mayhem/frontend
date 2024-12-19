"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function InventoryBar() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="flex items-center justify-center md:justify-start gap-0 sm:gap-1 md:gap-4 w-full m-0">
      <Button
        asChild
        variant={"simple"}
        className={`m-0 whitespace-nowrap ${
          isActive("/character/inventory")
            ? "text-arena-orange/25 gradient-text-name-character font-bold"
            : "font-normal"
        }`}
      >
        <Link href="/character/inventory/">
          <p className="text-sm sm:text-base md:text-3xl py-0.5 sm:py-1 md:py-1 m-0">SKINS</p>
        </Link>
      </Button>

      <Button
        asChild
        variant={"simple"}
        className={`m-0 whitespace-nowrap ${
          isActive("/character/inventory/weapons")
            ? "text-arena-orange/25 gradient-text-name-character"
            : ""
        }`}
      >
        <Link href="/character/inventory/weapons">
          <p className="text-sm sm:text-base md:text-3xl py-0.5 sm:py-1 md:py-1 m-0">WEAPONS</p>
        </Link>
      </Button>

      <Button
        asChild
        variant={"simple"}
        className={`m-0 whitespace-nowrap ${
          isActive("/character/inventory/potions")
            ? "text-arena-orange/25 gradient-text-name-character"
            : ""
        }`}
      >
        <Link href="/character/inventory/potions">
          <p className="text-sm sm:text-base md:text-3xl py-0.5 sm:py-1 md:py-1 m-0">POTIONS</p>
        </Link>
      </Button>
    </div>
  );
}
