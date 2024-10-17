"use client";

import History from "@/components/Challenge/History";
import ActiveChallenges from "./ActiveChallenges";
import StageBar from "./StageBar";
import NavBarChallenge from "./NavBarChallenge";
import { usePathname } from "next/navigation";
import PayforCreate from "./PayforCreate";
import { useAccount } from "wagmi";
import NoAddress from "../Character/NoAddress";

export default function Stage() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isHistory = pathname === "/challenge/history";

  return (
    <>
      <StageBar
        action={<PayforCreate />}
        image="/challenges.svg"
        title="CHALLENGES"
      />
      <div className="flex md:flex-row flex-col">
        <NavBarChallenge />
        {!isConnected ? (
          <NoAddress
            title="NOTHING OVER HERE"
            description="You must connect your wallet to get started!"
          />
        ) : isHistory ? (
          <History />
        ) : (
          <ActiveChallenges />
        )}
      </div>
    </>
  );
}
