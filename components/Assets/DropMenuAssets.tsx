"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";
import type { DepositToken } from "@/lib/balances";

export default function DropMenuAssets({ token }: { token: DepositToken }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="items-center justify-between gradient-button px-6 py-4 gap-2 gradient-border shadow-parriba w-[168px] text-center h-[50px]"
          variant="simple"
        >
          <p className="gradient-text-name-character">ACTIONS</p>
          <Image
            src="/chevron.svg"
            alt=""
            width={1000}
            height={1000}
            className="size-[24px] "
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-arena-bg gradient-border w-40">
        <Withdraw token={token} />
        <Transfer token={token} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
