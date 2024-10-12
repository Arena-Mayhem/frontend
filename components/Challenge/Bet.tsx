"use client";

import type { Token } from "@/lib/atoms";

import { Fragment, useState } from "react";
import { SelectToken } from "./Select";
import { useFormattedInputHandler } from "@/lib/input";
import { TOKEN_ETH } from "@/lib/tokens";

export default function Bet({
  children,
}: {
  children: (props: {
    isValidBet: boolean;
    token: Token;
    value: bigint;
  }) => JSX.Element;
}) {
  const [token, setToken] = useState<Token>(TOKEN_ETH);
  const formatted = useFormattedInputHandler({
    decimals: token.decimals,
  });

  const isValidBet = formatted.value > 0;

  return (
    <Fragment>
      <p className="text-white px-4 text-base py-2">
        To create your challenge, you need to select a token and introduce a bet
        amount
      </p>
      <br />
      <div className="flex px-4 w-full flex-row gap-2">
        <label className="flex w-full items-center shadow-parriba gradient-border bg-arena-orange/20 backdrop-blur-sm">
          <input
            value={formatted.value}
            onChange={formatted.onChangeHandler}
            className="flex-grow w-full outline-none px-4 py-4 font-light text-white bg-transparent "
            placeholder="30"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            type="text"
          />
        </label>
        <SelectToken selectedToken={token} onSelect={setToken} />
      </div>

      {children({
        isValidBet,
        token,
        value: formatted.formattedValue,
      })}
    </Fragment>
  );
}
