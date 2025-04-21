"use client";

import { formatUnits, type Address } from "viem";
import DropMenuAssets from "./DropMenuAssets";
import Deposit from "./Deposit";
import { ZERO_BN } from "@/lib/constants";
import { useAccountDeposits } from "@/lib/balances";
import { useWalletBalance } from "@/lib/erc20";
import { useTokenData, useTokenImage, useTokenList } from "@/lib/tokens";

export default function DashboardAssets() {
  const allTokens = useTokenList();

  return (
    <div className="flex items-center justify-center pt-2 lg:py-8 w-full px-4 lg:mx-8">
      <div className="flex flex-col items-center justify-center w-full gap-6">
        {allTokens.map((token) => (
          <AssetsCards key={`token-${token.address}`} address={token.address} />
        ))}
      </div>
    </div>
  );
}

function AssetsCards({ address }: { address: Address }) {
  const tokenData = useTokenData(address);
  const depositBalance = useAccountDeposits(address);
  const { value: balance } = useWalletBalance(address);
  const DECIMALS = tokenData?.decimals || 18;
  const { imageURL } = useTokenImage(tokenData);

  return (
    <div className="md:pt-8 lg:bg-arena-bg pb-4 lg:p-8 lg:border lg:border-b lg:border-white/20 lg:rounded-lg lg:shadow-padentro">
      <div className="div-oblicuo bg-arena-black gradient-border relative">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
        />

        <div
          aria-dev-note="caja-contenedora-de-los-tres-elementos"
          className="flex flex-col lg:flex-row justify-between items-center gap-8 w-full"
        >
          {/* Token image and symbol */}
          <div
            aria-dev-note="caja-imagen"
            className="flex-shrink-0 md:px-6 pt-6 md:pt-0 relative flex flex-row items-center justify-center overflow-hidden h-full mx-auto"
          >
            <figure className="size-[4.5rem] shadow-md rounded-full overflow-hidden">
              <img
                className="object-cover size-full"
                src={imageURL}
                alt="asset"
              />
            </figure>
            <p className="text-4xl px-4 font-bold text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700">
              {tokenData?.symbol || "ETH"}
            </p>
          </div>

          {/* First divider - visible only on mobile */}
          <div className="w-72 mb-1 mt-1 flex items-center h-px bg-arena-orange lg:hidden"></div>

          {/* Wallet and Deposit info */}
          <div className="mx-8 ml-14 flex flex-row items-center justify-center w-full gap-4 md:gap-8">
            <div
              aria-note-dev="caja-balance"
              className="justify-center flex-col items-center flex"
            >
              <p className="text-white text-sm">YOUR WALLET</p>
              <p className="text-white">
                {Number(formatUnits(balance, DECIMALS)).toFixed(3)}
              </p>
            </div>
            <div
              aria-note-dev="caja-deposito"
              className="justify-center gradient-border-left flex-col items-center flex"
            >
              <p className="text-white text-sm px-4 md:px-8">YOUR DEPOSIT</p>
              <p className="text-white px-8">
                {Number(
                  formatUnits(depositBalance.data?.amount || ZERO_BN, DECIMALS),
                ).toFixed(3)}
              </p>
            </div>
          </div>

          {/* Second divider - visible only on mobile */}
          <div className="w-72 mb-1 mt-1 flex items-center h-px bg-arena-orange lg:hidden"></div>

          {/* Action buttons */}
          <div
            aria-note-dev="caja-join-challenge"
            className="md:pt-3 flex lg:border-l relative items-center justify-center lg:div-oblicuo lg:gradient-border-left"
          >
            <img
              src="/square.svg"
              className="absolute top-0 left-0 pointer-events-none hidden lg:block"
            />
            <div
              aria-note-dev="box-contain button and profit"
              className="w-full mx-auto pb-6 md:py-8"
            >
              <div className="pb-4 md:mx-8">
                <DropMenuAssets token={address} />
              </div>
              <div className="md:mx-8">
                <Deposit
                  balance={{
                    value: balance,
                    decimals: DECIMALS,
                  }}
                  token={address}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
