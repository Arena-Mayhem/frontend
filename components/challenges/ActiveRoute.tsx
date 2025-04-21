"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import React from "react";
import { cn } from "@/lib/utils";

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
    <div className="flex justify-start flex-col md:pl-[64px] mt-2 md:mt-0">
      <Button
        asChild
        variant={"simple"}
        className={cn(
          "relative md:min-h-24 px-6 md:py-6 py-2 md:w-[20rem]",
          isActive
            ? "md:bg-gradient-to-r md:gradient-border-left md:from-arena-orange/25 md:to-[#141414] items-start md:rounded-none flex flex-col w-full"
            : "items-start md:rounded-none flex flex-col w-full md:w-102 md:h-fit",
        )}
      >
        <Link href={path} className="w-full h-full">
          <div className="flex flex-col h-full">
            <span className="inline-block">
              <p
                className={`
                text-lg md:text-2xl text-left py-0.5 md:py-1
                ${isActive ? "text-arena-orange relative" : "text-white"}
                ${isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#c14003] after:to-[#f9b208] md:after:hidden" : ""}
                inline-block
              `}
              >
                {title}
              </p>
            </span>
            {isActive && (
              <div className="hidden md:block flex-1">
                <p className="text-xs description mt-4 md:mt-0">
                  {description}
                </p>
              </div>
            )}
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default ActiveRoute;
