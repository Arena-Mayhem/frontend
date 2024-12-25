"use client";
import { usePathname } from "next/navigation";
import ActiveRoute from "./ActiveRoute";
import { Fragment } from "react";

export default function NavBarChallenge() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="flex flex-col">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex flex-row justify-left gap-1">
          <div className="w-auto">
            <ActiveRoute
              isActive={isActive("/challenge") || pathname === "/"}
              path="/challenge"
              title="ONGOING"
              description={
                <Fragment>
                  Active challenges. Pay the entrance fee and enter <br /> a duel
                  where only the strongest will survive.
                </Fragment>
              }
            />
          </div>
          <div className="w-auto">
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
        </div>

        {/* Yellow line divider */}
        <div className="px-4 -mt-2">
        <div className="w-full h-px bg-yellow-400" />
        <div className="px-2 mt-4 min-h-[60px]">
          {(isActive("/challenge") || pathname === "/") && (
            <p className="text-xs text-white">
              Active challenges. Pay the entrance fee and enter a duel
              where only the strongest will survive.
            </p>
          )}
          {isActive("/challenge/history") && (
            <p className="text-xs text-white">
              Watch your past matches, check them and improve
              your game strategies.
            </p>
          )}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Unchanged */}
      <div className="hidden md:flex md:flex-col">
        <ActiveRoute
          isActive={isActive("/challenge") || pathname === "/"}
          path="/challenge"
          title="ONGOING"
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
    </div>
  );
}
