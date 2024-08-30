import {
  useAccountModal,
  useConnectModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

import { Button } from "./button";
import {
  createConfig,
  http,
  useAccount,
  useConnectors,
  useEnsName,
} from "wagmi";
import { mainnet } from "viem/chains";

const pollingConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export const ButtonWallet = () => {
  const connectors = useConnectors();
  const { openAccountModal } = useRkAccountModal();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    blockTag: "latest",
    chainId: mainnet.id,
    config: pollingConfig,
  });

  return (
    <Button onClick={openAccountModal} className="text-lg" variant="arena-main">
      {address
        ? ensName
          ? ensName
          : beautifyAddress(address)
        : "Conect Wallet"}
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
