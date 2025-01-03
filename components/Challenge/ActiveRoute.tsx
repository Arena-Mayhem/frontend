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
    <div className="flex justify-start flex-col md:px-[64px] mt-2 md:mt-8">
      <Button
        asChild
        variant={"simple"}
        className={`
          ${
            isActive
              ? "md:bg-gradient-to-r md:gradient-border-left md:from-arena-orange/25 md:to-[#141414] relative items-start md:py-4 py-2 md:rounded-none md:h-30 flex flex-col md:w-full"
              : "items-start md:rounded-none md:py-4 py-2 md:h-30 flex flex-col md:w-full"
          }
          w-auto h-auto
        `}
      >
        <Link href={path} className="w-full">
          <div className="flex flex-col">
            <span className="inline-block">
              <p
                className={`
                text-lg md:text-2xl text-left py-0.5 md:py-1 
                ${isActive ? "text-arena-orange relative" : "text-white"}
                whitespace-nowrap
                ${isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#c14003] after:to-[#f9b208] md:after:hidden" : ""}
                inline-block
              `}
              >
                {title}
              </p>
            </span>
            {isActive && (
              <div className="hidden md:block">
                <br />
                <p className="text-xs description mt-2 md:mt-0">
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
