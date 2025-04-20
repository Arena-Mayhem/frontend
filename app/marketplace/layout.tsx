import DefaultPageLayout, {
  type PropsWithChildren,
} from "@/components/DefaultPageLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DefaultPageLayout image="/charactericon.svg" pageTitle="MARKETPLACE">
      {children}
    </DefaultPageLayout>
  );
}
