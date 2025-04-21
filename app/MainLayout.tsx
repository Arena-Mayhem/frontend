import { Fragment, type PropsWithChildren } from "react";
import MainNavigation from "@/components/MainNavigation";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <MainNavigation />
      {children}
    </Fragment>
  );
}
