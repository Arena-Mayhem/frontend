"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:text-white group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
