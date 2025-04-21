import type { PropsWithChildren } from "@/components/DefaultPageLayout";
import InventoryBar from "@/components/characters/Inventory/InventoryBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-arena-bg bg-cover p-0 sm:p-8 border border-b mx-auto sm:m-8 border-white/20 rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] shadow-padentro mb-2 mt-4">
      <InventoryBar />
      <div className="flex items-left justify-left">{children}</div>
    </div>
  );
}
