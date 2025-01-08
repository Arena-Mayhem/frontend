"use client";
import { usePathname } from "next/navigation";
import ActiveRoute from "../Challenge/ActiveRoute";
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
            isActive={isActive("/character") || pathname === "/"}
            path="/character"
            title="CHARACTER"
            description={
              <Fragment>
                Here you can view your character, edit it, assign <br /> weapons or
                create new ones.
              </Fragment>
            }
          />
        </div>
        <div className="w-auto">
          <ActiveRoute
            isActive={pathname.startsWith("/character/inventory")}
            path="/character/inventory"
            title="INVENTORY"
            description={
              <Fragment>
                Here you can see all the items you have accumulated:
                <br /> skins, weapons and potions
              </Fragment>
            }
          />
        </div>
      </div>
            {/* Yellow line divider */}
        <div className="px-4 -mt-2">
          <div className="w-full h-px bg-yellow-400" />
          <div className="px-2 mt-4 min-h-16">
            {(isActive("/character") || pathname === "/") && (
              <p className="text-xs text-white">
                Here you can view your character, edit it, assign weapons or
                create new ones.
              </p>
            )}
            {pathname.startsWith("/character/inventory") && (
              <p className="text-xs text-white">
                Here you can see all the items you have accumulated:
                 skins, weapons and potions.
              </p>
            )}
          </div>
        </div>
      </div>
    
    {/* Desktop Layout - Unchanged */}
    <div className="hidden md:flex md:flex-col">
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
    </div>
  );
}
