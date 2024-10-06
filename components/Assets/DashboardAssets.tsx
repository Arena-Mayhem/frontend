import { formatUnits, type Address } from "viem";

import DropMenuAssets from "./DropMenuAssets";
import Deposit from "./Deposit";
import { ZERO_BN } from "@/lib/constants";
import { useAccountDeposits } from "@/lib/balances";
import { useWalletBalance } from "@/lib/erc20";
import { useTokenData, useTokenList } from "@/lib/tokens";
import { useImageForAddress } from "@/lib/images";

export default function DashboardAssets() {
  const allTokens = useTokenList();

  return (
    <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
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

  const { imageURL } = useImageForAddress({
    address: tokenData?.address,
    expectedImageURL: tokenData?.imageURL,
  });

  return (
    <div className="bg-arena-bg p-8 border border-b-[0.1px] border-white/20 rounded-lg w-full  shadow-padentro ">
      <div className="div-oblicuo bg-arena-black  gradient-border relative ">
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
          className="flex justify-between items-center gap-8 w-full "
        >
          <div
            aria-dev-note="caja-imagen"
            className=" flex-shrink-0 p-4 relative flex flex-row  items-center justify-center  overflow-hidden  h-full  mx-auto  "
          >
            <figure className="size-[4.5rem] shadow-md rounded-full overflow-hidden">
              <img
                className="object-cover size-full"
                src={imageURL}
                alt="asset"
              />
            </figure>
            <p className="text-4xl px-4 font-bold  text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700">
              {tokenData?.symbol || "ETH"}
            </p>
          </div>
          <div
            aria-note-dev="caja-balance"
            className="justify-center flex-col items-center flex"
          >
            <p className="text-white">YOUR WALLET</p>
            <p className="text-white">
              {Number(formatUnits(balance, DECIMALS)).toFixed(3)}
            </p>
          </div>
          <div
            aria-note-dev="caja-deposito"
            className="justify-center gradient-border-left flex-col items-center flex"
          >
            <p className="text-white px-8">YOUR DEPOSIT</p>
            <p className="text-white px-8">
              {Number(
                formatUnits(depositBalance.data?.amount || ZERO_BN, DECIMALS),
              ).toFixed(3)}
            </p>
          </div>

          <div
            aria-note-dev="caja-join-challenge"
            className="flex border-l relative items-center justify-center  div-oblicuo gradient-border-left  "
          >
            <img
              src="/square.svg"
              className="absolute top-0 left-0 pointer-events-none"
            />
            <div
              aria-note-dev="box-contain button and profit"
              className=" w-full mx-auto py-8"
            >
              <div className=" pb-4 mx-8">
                <DropMenuAssets token={address} />
              </div>
              <div className="mx-8">
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
