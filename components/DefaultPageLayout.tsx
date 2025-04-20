import { Fragment, type PropsWithChildren } from "react";
import StageBar from "@/components/StageBar";

export { PropsWithChildren };
export type LayoutProps = PropsWithChildren<{
  image: string;
  pageTitle: string;
  action?: JSX.Element;
}>;

export default function DefaultPageLayout({
  children,
  pageTitle,
  ...barProps
}: LayoutProps) {
  return (
    <Fragment>
      <StageBar title={pageTitle} {...barProps} />
      {children}
    </Fragment>
  );
}
