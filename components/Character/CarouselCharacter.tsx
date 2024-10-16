import Image from "next/image";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export default function CarouselCharacter({
  onSkinSelected,
}: {
  onSkinSelected?: ({}: { name: string; imageURL: string }) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const selectHero = () => {
      onSkinSelected?.(HERO_LIST[api.selectedScrollSnap()]);
    };

    selectHero();

    api.on("select", selectHero);
  }, [api]);

  return (
    <div className="flex items-center mx-auto justify-between">
      <Carousel setApi={setApi} className="w-full">
        <p className="gradient-text-name-character text-xl text-center pb-8">
          SKIN SELECTION
        </p>
        <CarouselContent>
          {HERO_LIST.map(({ imageURL, name }, index) => (
            <CarouselItem key={index}>
              <div className=" m-2  relative items-center justify-center flex h-[490px]">
                <Image
                  src={imageURL}
                  className="object-cover items-center justify-center flex bg-arena-bg rounded-[55px] h-full"
                  alt=""
                  width={300}
                  height={500}
                />
              </div>

              <p className="gradient-text-name-character text-lg text-center pt-8">
                {name}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white" />
        <CarouselNext className="text-white" />
      </Carousel>
    </div>
  );
}

const HERO_LIST = [
  {
    name: "Wizard",
    imageURL: "/wizard.png",
  },
  {
    name: "Monster",
    imageURL: "/ogro.png",
  },
  {
    name: "Knight",
    imageURL: "/knight.png",
  },
  {
    name: "Barak",
    imageURL: "/barak.png",
  },
  {
    name: "Shaman",
    imageURL: "/shaman.png",
  },
];
