import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ScreenShot() {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 p-2">
        <div className="flex justify-center flex-col">
          <h1 className="text-white text-4xl">NO GAME</h1>
          <h1 className="text-white text-4xl">NO GAIN</h1>
          <p className="text-white text-base py-8">
            Share on twitter the winnings you have achieved in Arena Mayhem
          </p>
          <Button
            variant="arena-main"
            className="mt-8 py-6 flex w-48 text-arena-orange"
          >
            SHARE ON TWITTER
          </Button>
        </div>
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-white text-center">IMAGE PREVIEW</h1>
          <Image
            className=" w-full"
            src="/share.png"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </>
  );
}
