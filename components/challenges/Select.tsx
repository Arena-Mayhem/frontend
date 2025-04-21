import type { Token } from "@/lib/atoms";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useTokenList } from "@/lib/tokens";

export function SelectToken({
  selectedToken,
  onSelect,
}: {
  selectedToken: Token;
  onSelect: (token: Token) => void;
}) {
  const tokens = useTokenList();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="text-white w-40 text-base gradient-border shadow-parriba text-center h-[64px]"
          variant="simple"
        >
          <span className="flex-grow">{selectedToken.symbol}</span>
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
        {tokens.map((token) => (
          <DropdownMenuItem key={`token-${token.address}`} asChild>
            <Button
              onClick={() => onSelect(token)}
              className="w-full block"
              variant="simple"
            >
              <p className="gradient-text-name-character hover hover:gradient-text-defeat">
                {token.symbol}
              </p>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
