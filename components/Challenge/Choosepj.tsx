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
import Querypj from "./Querypj";

const images = ["/champsword.png", "/champ.png", "/dolvin.jpg", "/colin.jpg"];

export function Choosepj() {
  return (
    <Carousel>
      <p className="text-white">
        {" "}
        Select the warrior who will fight in this challenge{" "}
      </p>
      <br />
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <Querypj />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
