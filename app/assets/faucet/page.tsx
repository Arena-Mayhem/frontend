"use client";

import { useState } from "react";

import StageBar from "@/components/Challenge/StageBar";
import { useRkAccountModal } from "@/components/ui/button-connectwallet";

import NavBarAssets from "@/components/Assets/NavBarAssets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAddress } from "viem";
import { toast } from "sonner";
import { addEtherNetwork } from "./utils";

let toaster: any;
export default function Balance() {
  const { openAccountModal, isConnected } = useRkAccountModal();

  const [address, setAddress] = useState("");

  function handleAddNetwork() {
    if (!isConnected) return openAccountModal?.();
    addEtherNetwork({
      chainId: "0x7A69",
      chainName: "Arena Testnet",
      rpcUrl: "https://am-rpc.onlemon.cloud",
      blockExplorerUrl: "https://www.mayhem.cool",
      symbol: "ETH",
    });
  }

  function handleClaim() {
    if (isAddress(address)) {
      toaster = toast.loading("Claiming ETH...");
      return fetch(`/api/claim/${address}`, {
        method: "POST",
      })
        .then((r) => {
          r.ok
            ? toast.success("ETH claimed")
            : toast.error("You can claim ONCE a day");
        })
        .finally(() => {
          toast.dismiss(toaster);
        });
    }
    toast.error("Invalid address");
  }
  return (
    <>
      <StageBar image="/assets.png" title="ASSETS" />
      <div className="flex md:flex-row flex-col text-white">
        <NavBarAssets />
        <div className="bg-arena-bg p-8 m-8 border border-b-[0.1px] border-white/20 rounded-lg w-full shadow-padentro  ">
          <p className="text-white">
            You can get some ETH tokens from the faucet. You can only use it
            once a day.
          </p>
          <Input
            className="text-lg mt-2 max-w-xl mb-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your wallet address"
          />

          <Button
            onClick={handleClaim}
            className="gradient-button px-2 my-2 rounded-lg border-2 border-arena-orange text-arena-orange text-lg"
            variant="simple"
          >
            CLAIM ETH
          </Button>

          <Button
            onClick={handleAddNetwork}
            className="gradient-button ml-2 px-2 my-2 rounded-lg border-2 border-arena-orange text-arena-orange text-lg"
            variant="simple"
          >
            ADD NETWORK
          </Button>

          <hr className="mt-4" />

          <table className="mt-2">
            <tbody>
              <tr>
                <td>RPC</td>
                <td className="px-8 py-2">https://am-rpc.onlemon.cloud</td>
              </tr>

              <tr>
                <td>Chain ID</td>
                <td className="px-8">31337</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
