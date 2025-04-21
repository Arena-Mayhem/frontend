import DefaultPageLayout, {
  type PropsWithChildren,
} from "@/components/DefaultPageLayout";

import ModalCustomAsset from "@/components/characters/ModalCustomAsset";
import PageSideBar from "@/components/PageSideBar";
import WithForceConnect from "@/components/WithForceConnect";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DefaultPageLayout
      image="/assets.png"
      pageTitle="ASSETS"
      action={<ModalCustomAsset />}
    >
      <PageSideBar
        routes={[
          {
            path: "/assets",
            title: "MANAGE",
            description:
              "Here you can deposit, withdraw, and transfer your tokens. Also you can check your balance.",
          },
          {
            path: "/assets/balance",
            title: "PROFIT / LOSSES",
            description:
              "Monitor your arena earnings and losses. See which characters brought you the most glory.",
          },
          {
            path: "/assets/faucet",
            title: "Token Faucet",
            description:
              "Use the faucet to get some free tokens. You can only use it once a day.",
          },
        ]}
      />

      <WithForceConnect>{children}</WithForceConnect>
    </DefaultPageLayout>
  );
}
