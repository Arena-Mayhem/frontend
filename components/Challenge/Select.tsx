import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export function SelectToken({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (token: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="text-white w-40 text-base gradient-border shadow-parriba text-center h-[64px]"
          variant="simple"
        >
          <span className="flex-grow">{selected}</span>
          <Image
            src="/arrowdown.svg"
            alt=""
            width={1000}
            height={1000}
            className="w-[24px] mx-2 h-[24px] "
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-arena-bg gradient-border w-40">
        {["ETH", "USDT", "DAI"].map((token) => (
          <DropdownMenuItem key={`token-${token}`} asChild>
            <Button
              onClick={() => onSelect(token)}
              className="w-full block"
              variant="simple"
            >
              <p className="gradient-text-name-character hover hover:gradient-text-defeat">
                {token}
              </p>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
