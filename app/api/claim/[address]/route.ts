import { cartesi } from "@/lib/chains";
import { kv } from "@vercel/kv";
import {
  type Hex,
  createWalletClient,
  http,
  parseEther,
  zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const DEV_KEY = process.env.DEV_PRIVATE_KEY as Hex | undefined;

if (!DEV_KEY) {
  console.error("claim/[address]/route.ts:: DEV_PRIVATE_KEY not provided");
}

const walletClient = createWalletClient({
  transport: http(),
  chain: cartesi,
  account: DEV_KEY ? privateKeyToAccount(DEV_KEY) : zeroAddress,
});

export async function POST(
  _: any,
  { params }: { params: { address: string } },
) {
  const { address } = params;

  const CLAIM_KEY = `am.faucet.last-claimed.${address}`;
  const claimed_timestamp = await kv.get<string>(CLAIM_KEY);
  const now = Date.now();

  console.debug({ claimed_timestamp, now });

  if (claimed_timestamp && now - parseInt(claimed_timestamp) < ONE_DAY_IN_MS) {
    return Response.json({ error: "Already claimed" }, { status: 401 });
  }

  const claimedTime = now.toString();
  await kv.set(CLAIM_KEY, claimedTime);

  const hash = await walletClient.sendTransaction({
    to: address as any,
    value: parseEther("0.2"),
  });

  return Response.json({ ok: true, hash, claimedTime });
}
