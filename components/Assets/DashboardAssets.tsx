import { formatUnits, type Address } from "viem";
import { useAccount } from "wagmi";
import Image from "next/image";

import DropMenuAssets from "./DropMenuAssets";
import Deposit from "./Deposit";
import { ZERO_BN } from "@/lib/constants";
import { useAccountDeposits } from "@/lib/balances";
import { useWalletBalance } from "@/lib/erc20";

type AssetList = "USDC" | "DAI";
export default function DashboardAssets() {
  return (
    <>
      <div className="flex items-center justify-center py-8 w-full pb-8 mx-8">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <AssetsCards asset="/eth.png" asset_type="ETH" />
          <AssetsCards asset="/usdc.png" asset_type="USDC" />
          <AssetsCards asset="/dai.png" asset_type="DAI" />
        </div>
      </div>
    </>
  );
}

export const ADDRESSES: Record<
  AssetList,
  {
    address: Address;
    decimals: number;
    symbol: string;
    imageURL: string;
  }
> = {
  DAI: {
    address: "0x36C02dA8a0983159322a80FFE9F24b1acfF8B570",
    decimals: 18,
    symbol: "DAI",
    imageURL: "/dai.png",
  },
  USDC: {
    address: "0x809d550fca64d94Bd9F66E60752A544199cfAC3D",
    decimals: 6,
    symbol: "USDC",
    imageURL: "/usdc.png",
  },
} as const;

function AssetsCards({
  asset,
  asset_type,
}: {
  asset: string;
  asset_type: AssetList | "ETH";
}) {
  const isETHToken = asset_type === "ETH";
  const ERC20_ADDRESS = ADDRESSES[asset_type as AssetList]?.address;

  const ERC20Address = ADDRESSES[asset_type as AssetList]?.address;

  const depositBalance = useAccountDeposits(isETHToken ? "ETH" : ERC20Address);

  const { value: balance } = useWalletBalance(
    isETHToken ? "ETH" : ERC20Address,
  );

  const DECIMALS = ADDRESSES[asset_type as AssetList]?.decimals || 18;

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
            <Image
              className="object-cover flex h-full "
              src={asset}
              alt="asset"
              width={72}
              height={72}
            />
            <p className="text-4xl px-4 font-bold  text-transparent bg-clip-text bg-300% bg-gradient-to-b from-arena-orange to-orange-700">
              {asset_type}
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
                <DropMenuAssets token={isETHToken ? "ETH" : ERC20_ADDRESS} />
              </div>
              <div className="mx-8">
                <Deposit
                  balance={{
                    value: balance,
                    decimals: DECIMALS,
                  }}
                  token={isETHToken ? "ETH" : ERC20_ADDRESS}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
