import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Cinzel } from "next/font/google";

import { URLQProvider } from "@/components/urlq-provider";
import { WagmiProvider } from "@/components/wagmi-provider";
import { Toaster } from "@/components/ui/sonner";

import MainLayout from "./MainLayout";

const defaultFont = Cinzel({
  subsets: [],
  weight: ["800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${defaultFont.className} antialiased`}>
        <Toaster />
        <URLQProvider>
          <WagmiProvider>
            <MainLayout>{children}</MainLayout>
          </WagmiProvider>
        </URLQProvider>
      </body>
    </html>
  );
}
