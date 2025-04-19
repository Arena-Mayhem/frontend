"use client";

import { usePathname } from "next/navigation";
import ActiveRoute from "@/components/Challenge/ActiveRoute";

export default function NavBarChallenge() {
  const pathname = usePathname();
  const NAVIGATION = Object.values(NAVIGATION_DATA).map((route) => (
    <ActiveRoute
      key={`in-route-${route.path}`}
      isActive={
        route.withSubRoutes
          ? pathname.startsWith(route.path)
          : pathname === route.path
      }
      path={route.path}
      title={route.title}
      description={route.description}
    />
  ));

  return (
    <div className="flex flex-col">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex flex-row justify-left gap-1">{NAVIGATION}</div>

        {/* Yellow line divider */}
        <div className="px-4 -mt-2">
          <div className="w-full h-px bg-yellow-400" />
          <div className="px-2 mt-4 min-h-16">
            <p className="text-xs text-white">
              {pathname === NAVIGATION_DATA.CHARACTER.path
                ? NAVIGATION_DATA.CHARACTER.description
                : NAVIGATION_DATA.INVENTORY.description}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Unchanged */}
      <div className="hidden md:flex md:flex-col">{NAVIGATION}</div>
    </div>
  );
}

const NAVIGATION_DATA = {
  CHARACTER: {
    path: "/character",
    withSubRoutes: false,
    title: "CHARACTER",
    description:
      "Here you can view your character, edit it, assign weapons or create new ones.",
  },
  INVENTORY: {
    path: "/character/inventory",
    withSubRoutes: true,
    title: "INVENTORY",
    description:
      "Here you can see all the items you have accumulated: skins, weapons and potions.",
  },
};
