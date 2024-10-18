import { cartesi } from "@/lib/chains";
import { kv } from "@vercel/kv";
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const walletClient = createWalletClient({
  transport: http(),
  chain: cartesi,
  account: privateKeyToAccount(process.env.DEV_PRIVATE_KEY as any),
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
