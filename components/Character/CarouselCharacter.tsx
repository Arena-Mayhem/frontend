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
  "/wizard.png",
  "/ogro.png",
  "/knight.png",
  "/barak.png",
  "/shaman.png",
];
const characterTypes = ["Wizard", "Monster", "Knight", "Barak", "Shaman"];

export function CarouselCharacter() {
  return (
    <div className="flex items-center mx-auto justify-between">
      <Carousel className="w-full">
        <p className="gradient-text-name-character text-xl text-center pb-8">
          SKIN SELECTION
        </p>
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className=" m-2  relative items-center justify-center flex h-[490px]">
                <Image
                  src={imageUrl}
                  className="object-cover items-center justify-center flex bg-arena-bg rounded-[55px]  h-full"
                  alt={`Character ${index + 1}`}
                  width={300}
                  height={500}
                />
              </div>

              <p className="gradient-text-name-character text-lg text-center pt-8">
                {characterTypes[index]}
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
