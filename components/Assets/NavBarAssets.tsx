"use client";
import { usePathname } from "next/navigation";
import ActiveRoute from "../Challenge/ActiveRoute";
import { Fragment } from "react";

export default function NavBarAssets() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="flex flex-col">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex flex-row justify-left gap-2">
          <div className="w-auto">
            <ActiveRoute
              isActive={isActive("/assets")}
              path="/assets"
              title="MANAGE"
              description={
                <Fragment>
                  Here you can deposit, withdraw, and transfer your <br />
                  tokens. Also you can check your balance.
                </Fragment>
              }
            />
          </div>
          <div className="w-auto">
            <ActiveRoute
              isActive={pathname.startsWith("/assets/balance")}
              path="/assets/balance"
              title="P&L"
              description={
                <Fragment>
                  Monitor your arena earnings and losses. <br />
                  See which characters brought you the most glory.
                </Fragment>
              }
            />
          </div>
          <div className="w-auto">
            <ActiveRoute
              isActive={pathname.startsWith("/assets/faucet")}
              path="/assets/faucet"
              title="FAUCET"
              description={
                <Fragment>
                  Use the faucet to get some free tokens. <br /> You can only use it
                  once a day.
                </Fragment>
              }
            />
          </div>
        </div>

        {/* Yellow line divider */}
        <div className="px-4 -mt-2">
          <div className="w-full h-px bg-yellow-400" />
          <div className="px-2 mt-4 min-h-16">
            {isActive("/assets") && (
              <p className="text-xs text-white">
                Here you can deposit, withdraw, and transfer your tokens. Also you can check your balance.
              </p>
            )}
            {pathname.startsWith("/assets/balance") && (
              <p className="text-xs text-white">
                Monitor your arena earnings and losses. See which characters brought you the most glory.
              </p>
            )}
            {pathname.startsWith("/assets/faucet") && (
              <p className="text-xs text-white">
                Use the faucet to get some free tokens. You can only use it once a day.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col">
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
              Monitor your arena earnings and losses. <br />See which characters brought you the most glory.
            </Fragment>
          }
        />
        <ActiveRoute
          isActive={pathname.startsWith("/assets/faucet")}
          path="/assets/faucet"
          title="Token Faucet"
          description={
            <Fragment>
              Use the faucet to get some free tokens. <br /> You can only use it
              once a day.
            </Fragment>
          }
        />
      </div>
    </div>
  );
}
