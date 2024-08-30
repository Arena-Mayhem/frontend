"use client";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Cinzel } from "next/font/google";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { localhost, hardhat, anvil } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "700",
  display: "auto",
});

const config = getDefaultConfig({
  appName: "arena-mayhem",
  projectId: "f5dc276367eb7e124550036ec4aab6df",
  chains: [localhost, hardhat, anvil],
  // using localhost chain for development
  ssr: true,
  // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cinzel.className}>
        <Toaster />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
