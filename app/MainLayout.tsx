import { Fragment, type PropsWithChildren } from "react";
import MainNavigation from "@/components/Navigation/Navbar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <MainNavigation />
      {children}
    </Fragment>
  );
}
