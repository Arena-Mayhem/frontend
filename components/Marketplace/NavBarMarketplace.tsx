"use client";
import { usePathname } from "next/navigation";
import ActiveRoute from "../Challenge/ActiveRoute";
import { Fragment } from "react";

export default function NavBarChallenge() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return (
    <div className="flex flex-col flex-grow">
      <ActiveRoute
        isActive={isActive("/marketplace")}
        path="/marketplace"
        title="SKINS"
        description={
          <>
            Customize your character with cool skins and show <br />
            off your style to your friends and enemies alike.
          </>
        }
      />
      <ActiveRoute
        isActive={pathname.startsWith("/marketplace/weapons")}
        path="/marketplace/weapons"
        title="WEAPONS"
        description={
          <>
            Equipe your character with cool weapons. Choose a <br /> good one to
            defeat your enemies and win the game.
          </>
        }
      />
      <ActiveRoute
        isActive={pathname.startsWith("/marketplace/potions")}
        path="/marketplace/potions"
        title="POTIONS"
        description={
          <>
            Discovery several usages, a large list of potions <br /> can
            increase your skills and lead you to victory.
          </>
        }
      />
      <ActiveRoute
        isActive={pathname.startsWith("/marketplace/random")}
        path="/marketplace/random"
        title="RANDOM BOX"
        description={
          <>
            Open a random box and get a random item <br /> to improve your
            character, rare items for you.
          </>
        }
      />
    </div>
  );
}
