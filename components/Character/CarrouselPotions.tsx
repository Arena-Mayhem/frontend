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

const images = ["/potionroja.png", "/potionsverde.png", "/potionazul.png"];
const PotionsTypes = ["Skullbrew", "Stormfire", "Windsbane"];

export default function CarouselPotions() {
  return (
    <div className="flex mx-auto  justify-center items-end">
      <Carousel className="">
        <p className="text-white  text-xl text-center pb-8">POTION SELECTION</p>
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

              <p className="gradient-text-name-character text-lg text-center uppercase pt-8">
                {PotionsTypes[index]}
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
