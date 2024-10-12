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
import ModalPlayer, { type GenericOnChangeHandlers } from "./ModalPlayer";

const images = ["/shaman.png", "/wizard.png", "/ogro.png"];

export function Choosepj(props: Partial<GenericOnChangeHandlers>) {
  return (
    <Carousel>
      <p className="text-white">
        Select the warrior who will fight in this challenge
      </p>
      <br />
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <ModalPlayer
              type="fighter"
              avatar={imageUrl}
              victories="10"
              amount_defeats="32"
              {...props}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
