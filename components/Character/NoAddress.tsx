import Image from "next/image";
import { ButtonWallet } from "../ui/button-connectwallet";
import { CreateChallengeButton } from "../ui/button-create-challenge";
import { useAccount } from "wagmi";

export default function NoAddress({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { address } = useAccount();

  return (
    <div className="bg-arena-bg bg-cover p-4 sm:p-8 border border-b mx-auto sm:m-8 border-white/20 rounded-lg sm:max-w-6xl w-[calc(100%-2rem)] shadow-padentro mb-2 mt-4">
      <div className="mx-10 my-10 sm:m-16 flex items-center justify-center flex-col">
        <Image
          src="/woodensword.svg"
          alt=""
          height={1000}
          width={1000}
          className="size-40 sm:size-56 mb-4"
        />
        <h1 className="text-white text-center text-xl sm:text-2xl p-2 sm:whitespace-normal whitespace-pre-line">{title}</h1>
        <p className="text-white text-center pb-4 sm:pb-8 sm:whitespace-normal whitespace-pre-line">{description}</p>
        {address ? <CreateChallengeButton /> : <ButtonWallet />}
      </div>
    </div>
  );
}
