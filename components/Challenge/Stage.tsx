"use client";

import History from "@/components/Challenge/History";
import ActiveChallenges from "./ActiveChallenges";
import NavBarChallenge from "./NavBarChallenge";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

import NoAddress from "../Character/NoAddress";

export default function Stage() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isHistory = pathname === "/challenge/history";

  return (
    <div className="flex md:flex-row flex-col">
      <NavBarChallenge />
      {!isConnected ? (
        <NoAddress
          title="NOTHING TO SEE HERE"
          description="Please connect before you continue"
        />
      ) : isHistory ? (
        <History />
      ) : (
        <ActiveChallenges />
      )}
    </div>
  );
}
