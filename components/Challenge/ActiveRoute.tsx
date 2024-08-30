"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import React from "react";

const ActiveRoute = ({
  isActive,
  path,
  title,
  description,
}: {
  isActive: boolean;
  path: string;
  title: string;
  description?: JSX.Element | string;
}) => {
  return (
    <div className="flex justify-start flex-col md:px-[64px] mt-8">
      <Button
        asChild
        variant={"simple"}
        className={
          isActive
            ? "bg-gradient-to-r gradient-border-left items-start py-4 from-arena-orange/25 to-[#141414] rounded-none h-30 flex flex-col"
            : "items-start rounded-none py-4 h-30 flex flex-col"
        }
      >
        <Link href={path}>
          <p className="text-2xl text-left py-1 text-arena-orange">{title}</p>
          <br />
          <p className="text-xs description">{description}</p>
        </Link>
      </Button>
    </div>
  );
};

export default ActiveRoute;
