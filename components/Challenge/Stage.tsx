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
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const isOngoing = isActive("/challenge") || pathname === "/";
  const { isConnected } = useAccount();

  return (
    <>
      <StageBar
        action={<PayforCreate />}
        image="/challenges.svg"
        title="CHALLENGES"
      />
      <div className="flex md:flex-row flex-col">
        <NavBarChallenge />
        {isOngoing && isConnected ? (
          <ActiveChallenges />
        ) : !isConnected ? (
          <NoAddress
            imageUrl="/woodensword.svg"
            tittle="NOTHING OVER HERE"
            description="You must create your first challenge to get started!"
          />
        ) : (
          <History />
        )}
      </div>
    </>
  );
}
