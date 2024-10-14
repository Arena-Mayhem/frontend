import type { WithClassName } from "@/lib/types";
import asset_icon from "@/assets/skull.svg";
import Image from "next/image";

export default function IconSkull({ className }: WithClassName) {
  return <Image src={asset_icon} alt="" className={className} />;
}
