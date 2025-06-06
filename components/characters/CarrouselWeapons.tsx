import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "axe_c.svg",
  "axe2_c.svg",
  "axe3_c.svg",
  "knife_c.svg",
  "lance_c.svg",
  "sword_c.svg",
];
const WeaponsTypes = [
  "SKULL CRAKER",
  "Shredder",
  "Soul Harvester",
  "Stormcaller",
  "Thunderstrike",
  "Steel Fang",
];

export default function CarouselWeapons() {
  return (
    <div className="flex mx-auto justify-center items-end">
      <Carousel className="w-1/2">
        <p className="text-white  text-xl text-center pt-4 md:pt-0 pb-1 md:pb-8">WEAPON SELECTION</p>
        
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className=" m-2  relative items-center justify-center flex h-[300px]">
                <Image
                  src={imageUrl}
                  className="object-fit items-center p-2 justify-center flex bg-arena-bg rounded-[55px]  h-full  "
                  alt={`Character ${index + 1}`}
                  width={240}
                  height={200}
                />
              </div>

              <p className="gradient-text-name-character text-lg text-center uppercase   pt-2 md:pt-8">
                {WeaponsTypes[index]}
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
