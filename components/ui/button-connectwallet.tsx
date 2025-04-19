import {
  useAccountModal,
  useConnectModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

import { Button } from "./button";
import { createConfig, http, useAccount, useEnsName } from "wagmi";
import { mainnet } from "viem/chains";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * We consume ENS from ethereum mainnet
 */
const mainnetConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

type SizeType = "default" | "mobile";

type ButtonWalletProps = Omit<ComponentProps<typeof Button>, "size"> & {
  size?: SizeType;
};

export const ButtonWallet = ({
  size = "default" as SizeType,
  ...props
}: ButtonWalletProps) => {
  const { openAccountModal } = useRkAccountModal();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    blockTag: "latest",
    chainId: mainnet.id,
    config: mainnetConfig,
  });

  const isMobile = size === "mobile";
  const buttonText = address
    ? ensName
      ? ensName
      : beautifyAddress(address)
    : isMobile
      ? "Connect"
      : "Connect Wallet";

  return (
    <Button
      suppressHydrationWarning
      onClick={openAccountModal}
      variant="arena-main"
      className={cn(
        "whitespace-nowrap",
        isMobile ? "text-xs px-1 py-1" : "text-lg",
      )}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export const useRkAccountModal = () => {
  const { isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const { openConnectModal = openChainModal } = useConnectModal();
  const { openAccountModal = openConnectModal } = useAccountModal();

  return {
    openAccountModal,
    isConnected,
  };
};

export const beautifyAddress = (addr: string, size = 4, separator = "...") =>
  `${addr.substr(0, size)}${separator}${addr.substr(-size, size)}`;
