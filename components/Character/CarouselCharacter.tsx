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
    <div className="flex items-center md:mx-auto justify-between md:ml-8">
      <Carousel
        setApi={setApi}
        className="w-full max-w-[90%] mx-auto"
        opts={{
          align: "center",
          containScroll: "trimSnaps",
        }}
      >
        <p className="gradient-text-name-character text-base md:text-xl text-center pb-1 md:pb-0">
          SKIN SELECTION
        </p>
        <CarouselContent>
          {HERO_LIST.map(({ imageURL, name }, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="md:m-8 relative items-center justify-center flex h-48 md:h-96">
                <Image
                  src={imageURL}
                  className="object-cover items-center justify-center flex bg-arena-bg rounded-xl md:rounded-[55px] h-full md:w-5/6"
                  alt={name}
                  width={300}
                  height={500}
                  priority={index === 0}
                />
              </div>

              <p className="gradient-text-name-character text-lg text-center pt-4">
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
    imageURL: "/giant_troll.png",
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
