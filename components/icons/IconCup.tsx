import type { WithClassName } from "@/lib/types";
import asset_icon from "@/assets/cup.svg";
import Image from "next/image";

export default function IconCup({ className }: WithClassName) {
  return <Image src={asset_icon} alt="" className={className} />;
}
