import DefaultPageLayout, {
  type PropsWithChildren,
} from "@/components/DefaultPageLayout";

import { Button } from "@/components/ui/button";
import CreateNew from "@/components/Character/CreateNew";
import PageSideBar from "@/components/PageSideBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DefaultPageLayout
      action={
        <CreateNew
          trigger={
            <Button
              variant="simple"
              className="pt-3.5 text-sm md:text-base text-yellow-400 md:text-white flex flex-row items-center justify-end w-full md:w-auto"
            >
              <div className="flex">
                <span className="block md:hidden">New Character</span>
                <span className="hidden md:block">Create New Character</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 md:w-6 md:h-6"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Button>
          }
        />
      }
      image="/charactericon.svg"
      pageTitle="CHARACTER"
    >
      <PageSideBar
        routes={[
          {
            path: "/character",
            withSubRoutes: false,
            title: "CHARACTER",
            description:
              "Here you can view your character, edit it, assign weapons or create new ones.",
          },
          {
            path: "/character/inventory",
            withSubRoutes: true,
            title: "INVENTORY",
            description:
              "Here you can see all the items you have accumulated: skins, weapons and potions.",
          },
        ]}
      />

      {children}
    </DefaultPageLayout>
  );
}
