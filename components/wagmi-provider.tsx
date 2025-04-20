"use client";

import type { PropsWithChildren } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider as Provider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { isDevEnv } from "@/lib/envs";
import { cartesi } from "@/lib/chains";
import { localhost, anvil, hardhat } from "viem/chains";

const DEV_CHAINS = isDevEnv() ? [localhost, anvil, hardhat] : [];

const config = getDefaultConfig({
  appName: "arena-mayhem",
  projectId: "f5dc276367eb7e124550036ec4aab6df",
  chains: [...DEV_CHAINS, cartesi] as any,
  // using localhost chain for development
  ssr: true,
  // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function WagmiProvider({ children }: PropsWithChildren) {
  return (
    <Provider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </Provider>
  );
}
