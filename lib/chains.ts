import { anvil } from "viem/chains";

export const cartesi = {
  ...anvil,
  name: "Anvil (Arena Mayhem)",
  rpcUrls: {
    default: {
      http: ["https://am-rpc.onlemon.cloud"],
    },
  },
};
