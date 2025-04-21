import DefaultPageLayout, {
  type PropsWithChildren,
} from "@/components/DefaultPageLayout";
import PageSideBar from "@/components/PageSideBar";
import WithForceConnect from "@/components/WithForceConnect";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DefaultPageLayout image="/charactericon.svg" pageTitle="MARKETPLACE">
      <PageSideBar
        routes={[
          {
            path: "/marketplace",
            title: "SKINS",
            description:
              "Customize your character with cool skins and show off your style to your friends and enemies alike.",
          },
          {
            path: "/marketplace/weapons",
            title: "WEAPONS",
            description:
              "Equipe your character with cool weapons. Choose a good one to defeat your enemies and win the game.",
          },
          {
            path: "/marketplace/potions",
            title: "POTIONS",
            description:
              "Discovery several usages, a large list of potions can increase your skills and lead you to victory.",
          },
        ]}
      />

      <WithForceConnect>
        <div className="bg-arena-bg bg-cover p-0 sm:p-8 border border-b mx-auto sm:m-8 border-white/20 rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] shadow-padentro mb-2 mt-4">
          {children}
        </div>
      </WithForceConnect>
    </DefaultPageLayout>
  );
}
