"use client";

import DefaultPageLayout, {
  type PropsWithChildren,
} from "@/components/DefaultPageLayout";

import PayforCreate from "@/components/Challenge/PayforCreate";
import PageSideBar from "@/components/PageSideBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DefaultPageLayout
      action={<PayforCreate />}
      image="/challenges.svg"
      pageTitle="CHALLENGES"
    >
      <PageSideBar
        routes={[
          {
            path: "/challenge",
            title: "ONGOING",
            defaultActive: true,
            description:
              "Active challenges. Pay the entrance fee and enter a duel where only the strongest will survive.",
          },
          {
            path: "/challenge/history",
            title: "HISTORY",
            description:
              "Watch your past matches, check them and improve your game strategies.",
          },
        ]}
      />
      {children}
    </DefaultPageLayout>
  );
}
