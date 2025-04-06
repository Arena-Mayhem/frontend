"use client";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Cinzel } from "next/font/google";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  Client,
  Provider as URLQProvider,
  cacheExchange,
  fetchExchange,
} from "urql";
import { Toaster } from "@/components/ui/sonner";
import { cartesi } from "@/lib/chains";
import { localhost, anvil, hardhat } from "viem/chains";

const defaultFont = Cinzel({
  subsets: [],
  weight: ["800", "900"],
});

const IS_DEV = process.env.NODE_ENV === "development";
const DEV_CHAINS = IS_DEV ? [localhost, anvil, hardhat] : [];

const config = getDefaultConfig({
  appName: "arena-mayhem",
  projectId: "f5dc276367eb7e124550036ec4aab6df",
  chains: [...DEV_CHAINS, cartesi] as any,
  // using localhost chain for development
  ssr: true,
  // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const urqlClient = new Client({
  url: IS_DEV
    ? "http://localhost:8080/graphql"
    : "https://am-ql.onlemon.cloud/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${defaultFont.className} antialiased`}>
        <Toaster />
        <URLQProvider value={urqlClient}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </URLQProvider>
      </body>
    </html>
  );
}
