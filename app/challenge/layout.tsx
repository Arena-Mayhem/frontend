"use client";

import DefaultPageLayout, {
  type PropsWithChildren,
} from "@/components/DefaultPageLayout";

import PayforCreate from "@/components/Challenge/PayforCreate";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DefaultPageLayout
      action={<PayforCreate />}
      image="/challenges.svg"
      pageTitle="CHALLENGES"
    >
      {children}
    </DefaultPageLayout>
  );
}
