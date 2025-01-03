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
        isActive={isActive("/character")}
        path="/character"
        title="CHARACTER"
        description={
          <Fragment>
            Here you can view your character, edit it, assign <br /> weapons or
            create new ones.
          </Fragment>
        }
      />
      <ActiveRoute
        isActive={pathname.startsWith("/character/inventory")}
        path="/character/inventory"
        title="INVENTORY"
        description={
          <Fragment>
            Here you can see all the items you have accumulated:
            <br /> skins, weapons and potions.
          </Fragment>
        }
      />
    </div>
  );
}
