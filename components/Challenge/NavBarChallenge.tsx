"use client";
import { usePathname } from "next/navigation";
import ActiveRoute from "./ActiveRoute";
import { Fragment } from "react";

export default function NavBarChallenge() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return (
    <div className="flex flex-col">
      <ActiveRoute
        isActive={isActive("/challenge")}
        path="/challenge"
        title="ON GOING"
        description={
          <Fragment>
            Active challenges. Pay the entrance fee and enter <br /> a duel
            where only the strongest will survive.
          </Fragment>
        }
      />
      <ActiveRoute
        isActive={isActive("/challenge/history")}
        path="/challenge/history"
        title="HISTORY"
        description={
          <Fragment>
            Watch your past matches, check them and improve <br />
            your game strategies.
          </Fragment>
        }
      />
    </div>
  );
}
