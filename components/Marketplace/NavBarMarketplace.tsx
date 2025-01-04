"use client";
import { usePathname } from "next/navigation";
import ActiveRoute from "../Challenge/ActiveRoute";
import { Fragment } from "react";

export default function NavBarMarketplace() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="flex flex-col">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex flex-row justify-left gap-1 overflow-x-auto">
          <div className="w-auto">
            <ActiveRoute
              isActive={isActive("/marketplace")}
              path="/marketplace"
              title="SKINS"
              description={
                <Fragment>
                  Customize your character with cool skins and show <br />
                  off your style to your friends and enemies alike.
                </Fragment>
              }
            />
          </div>
          <div className="w-auto">
            <ActiveRoute
              isActive={pathname.startsWith("/marketplace/weapons")}
              path="/marketplace/weapons"
              title="WEAPONS"
              description={
                <Fragment>
                  Equipe your character with cool weapons. Choose a <br /> good one to
                  defeat your enemies and win the game.
                </Fragment>
              }
            />
          </div>
          <div className="w-auto">
            <ActiveRoute
              isActive={pathname.startsWith("/marketplace/potions")}
              path="/marketplace/potions"
              title="POTIONS"
              description={
                <Fragment>
                  Discovery several usages, a large list of potions <br /> can
                  increase your skills and lead you to victory.
                </Fragment>
              }
            />
          </div>
          <div className="w-auto">
            <ActiveRoute
              isActive={pathname.startsWith("/marketplace/random")}
              path="/marketplace/random"
              title="RANDOM BOX"
              description={
                <Fragment>
                  Open a random box and get a random item <br /> to improve your
                  character, rare items for you.
                </Fragment>
              }
            />
          </div>
        </div>

        {/* Yellow line divider */}
        <div className="px-4 -mt-2">
          <div className="w-full h-px bg-yellow-400" />
          <div className="px-2 mt-4 min-h-16">
            {isActive("/marketplace") && (
              <p className="text-xs text-white">
                Customize your character with cool skins and show off your style to your friends and enemies alike.
              </p>
            )}
            {pathname.startsWith("/marketplace/weapons") && (
              <p className="text-xs text-white">
                Equipe your character with cool weapons. Choose a good one to defeat your enemies and win the game.
              </p>
            )}
            {pathname.startsWith("/marketplace/potions") && (
              <p className="text-xs text-white">
                Discovery several usages, a large list of potions can increase your skills and lead you to victory.
              </p>
            )}
            {pathname.startsWith("/marketplace/random") && (
              <p className="text-xs text-white">
                Open a random box and get a random item to improve your character, rare items for you.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col">
        <ActiveRoute
          isActive={isActive("/marketplace")}
          path="/marketplace"
          title="SKINS"
          description={
            <Fragment>
              Customize your character with cool skins and show <br />
              off your style to your friends and enemies alike.
            </Fragment>
          }
        />
        <ActiveRoute
          isActive={pathname.startsWith("/marketplace/weapons")}
          path="/marketplace/weapons"
          title="WEAPONS"
          description={
            <Fragment>
              Equipe your character with cool weapons. Choose a <br /> good one to
              defeat your enemies and win the game.
            </Fragment>
          }
        />
        <ActiveRoute
          isActive={pathname.startsWith("/marketplace/potions")}
          path="/marketplace/potions"
          title="POTIONS"
          description={
            <Fragment>
              Discovery several usages, a large list of potions <br /> can
              increase your skills and lead you to victory.
            </Fragment>
          }
        />
        <ActiveRoute
          isActive={pathname.startsWith("/marketplace/random")}
          path="/marketplace/random"
          title="RANDOM BOX"
          description={
            <Fragment>
              Open a random box and get a random item <br /> to improve your
              character, rare items for you.
            </Fragment>
          }
        />
      </div>
    </div>
  );
}
