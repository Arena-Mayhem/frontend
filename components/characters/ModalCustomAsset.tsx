"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-selectchamp";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import ArenaInput from "../ArenaInput";
import { usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { erc20Abi, isAddress } from "viem";
import { toast } from "sonner";
import { useCustomTokens } from "@/lib/atoms";

export default function ModalCustomAsset() {
  const [tokens, setTokens] = useCustomTokens();

  const client = usePublicClient();

  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  async function handleAddToken() {
    let symbol = "";
    let decimals = 0;

    if (!client) return;
    if (isAddress(address)) {
      try {
        symbol = await client.readContract({
          address: address as any,
          abi: erc20Abi,
          functionName: "symbol",
        });

        decimals = await client.readContract({
          address: address as any,
          abi: erc20Abi,
          functionName: "decimals",
        });
      } catch (_) {
        toast.error("Something went wrong");
      }

      if (symbol && decimals) {
        toast.success("Asset added successfully");
        setTokens(
          [
            ...tokens,
            {
              address,
              decimals,
              symbol,
            },
          ].filter(
            ({ address }, index, arr) =>
              arr.findIndex((t) => t.address === address) === index,
            // Remove duplicates from the array
          ),
        );

        return setIsOpen(false);
      }
    }

    toast.error("Invalid address");
  }

  useEffect(() => {
    if (isOpen) {
      setAddress("");
    }
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="simple"
          className="pt-3.5 text-sm md:text-base text-yellow-400 md:text-white flex flex-row items-center justify-end w-full md:w-auto"
        >
          <div className="flex">
            <span>Add Custom Asset</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 md:w-6 md:h-6"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex pt-4 text-white max-w-lg flex-col bg-arena-black justify-center">
        <AlertDialogCancel />

        <AlertDialogTitle className="text-4xl">CUSTOM ASSET</AlertDialogTitle>

        <h3 className="mt-2">Asset Address</h3>

        <ArenaInput
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        />

        <Button
          onClick={handleAddToken}
          variant="arena-main"
          className="mt-8 text-xl py-6 text-arena-orange"
        >
          Add Asset Now
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
