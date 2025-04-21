"use client";

import { usePathname } from "next/navigation";
import ActiveRoute from "@/components/Challenge/ActiveRoute";

export default function PageSideBar({
  routes,
}: {
  routes: Array<{
    path: `/${string}`;
    defaultActive?: boolean;
    withSubRoutes?: boolean;
    title: string;
    description: string;
  }>;
}) {
  const pathname = usePathname();

  const isActive = (route: { path: string; withSubRoutes?: boolean }) => {
    return route.withSubRoutes
      ? pathname.startsWith(route.path)
      : pathname === route.path;
  };

  const hasActiveRoutes = routes.some(isActive);

  const NAVIGATION = routes.map((route) => (
    <ActiveRoute
      key={`in-route-${route.path}`}
      isActive={hasActiveRoutes ? isActive(route) : !!route.defaultActive}
      path={route.path}
      title={route.title}
      description={route.description}
    />
  ));

  const MOBILE_DESCRIPTION =
    routes.find((route) => isActive(route))?.description || "N/A";

  return (
    <div className="flex flex-col">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex flex-row justify-left gap-1">{NAVIGATION}</div>

        {/* Yellow line divider */}
        <div className="px-4 -mt-2">
          <div className="w-full h-px bg-yellow-400" />
          <div className="px-2 mt-4 min-h-16">
            <p className="text-xs text-white">{MOBILE_DESCRIPTION}</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Unchanged */}
      <div className="hidden md:flex md:flex-col">{NAVIGATION}</div>
    </div>
  );
}
