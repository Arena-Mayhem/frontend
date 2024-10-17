import Image from "next/image";
import { ButtonWallet } from "../ui/button-connectwallet";

export default function NoAddress({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-arena-bg bg-cover p-8 border border-b-[0.1px] m-8 border-white/20 rounded-lg w-full shadow-padentro">
      <div className="m-16 flex items-center justify-center flex-col">
        <Image
          src="/woodensword.svg"
          alt=""
          height={1000}
          width={1000}
          className="size-56"
        />
        <h1 className="text-white text-center text-2xl p-2">{title}</h1>
        <p className="text-white text-center pb-8">{description}</p>
        <ButtonWallet />
      </div>
    </div>
  );
}
