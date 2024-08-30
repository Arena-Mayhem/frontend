"use client";
import { usePathname } from "next/navigation";
import ActiveRoute from "../Challenge/ActiveRoute";
import { Fragment } from "react";

export default function NavBarChallenge() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return (
    <div className="flex flex-col">
      <ActiveRoute
        isActive={isActive("/assets")}
        path="/assets"
        title="MANAGE ASSETS"
        description={
          <Fragment>
            Here you can deposit, withdraw, and transfer your <br />
            tokens. Also you can check your balance.
          </Fragment>
        }
      />
      <ActiveRoute
        isActive={pathname.startsWith("/assets/balance")}
        path="/assets/balance"
        title="PROFIT / LOSSES"
        description={
          <Fragment>
            Here you can deposit, withdraw, and transfer your <br />
            tokens. Also you can check your balance.
          </Fragment>
        }
      />
    </div>
  );
}
