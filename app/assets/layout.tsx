"use client";

import DefaultPageLayout, {
  type PropsWithChildren,
} from "@/components/DefaultPageLayout";
import ModalCustomAsset from "@/components/Character/ModalCustomAsset";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DefaultPageLayout
      image="/assets.png"
      pageTitle="ASSETS"
      action={<ModalCustomAsset />}
    >
      {children}
    </DefaultPageLayout>
  );
}
