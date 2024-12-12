"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function InventoryBar() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="flex gap-14">
      <Button
        asChild
        variant={"simple"}
        className={
          isActive("/character/inventory")
            ? " text-arena-orange/25 gradient-text-name-character font-bold"
            : "font-normal"
        }
      >
        <Link href="/character/inventory/">
          <p className="text-3xl text-left py-1 m-3">SKINS</p>
        </Link>
      </Button>

      <Button
        asChild
        variant={"simple"}
        className={
          isActive("/character/inventory/weapons")
            ? " text-arena-orange/25 gradient-text-name-character"
            : " "
        }
      >
        <Link href="/character/inventory/weapons">
          <p className="text-3xl text-left py-1">WEAPONS</p>
        </Link>
      </Button>
      <Button
        asChild
        variant={"simple"}
        className={
          isActive("/character/inventory/potions")
            ? " text-arena-orange/25 gradient-text-name-character"
            : " "
        }
      >
        <Link href="/character/inventory/potions">
          <p className="text-3xl text-left py-1">POTIONS</p>
        </Link>
      </Button>
    </div>
  );
}
