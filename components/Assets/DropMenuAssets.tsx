"use client";

import type { Address } from "viem";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";

export default function DropMenuAssets({ token }: { token: Address }) {
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
