import type { CarouselApi } from "@/components/ui/carousel";
import type { FighterData } from "@/lib/cartesi";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ModalPlayer from "./ModalPlayer";
import { useHeroes } from "@/lib/heroes";
import { useEffect, useState } from "react";

export const IMAGES_HEROES = ["/shaman.png", "/wizard.png", "/giant_troll.png"];

export default function HeroSelection({
  onHeroSelected,
}: {
  onHeroSelected?: (fighterHash: FighterData) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const { heroes } = useHeroes();

  useEffect(() => {
    if (!api) {
      return;
    }

    const selectHero = () => {
      onHeroSelected?.(heroes[api.selectedScrollSnap()]);
    };

    selectHero();

    api.on("select", selectHero);
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <p className="text-white">
        Select the warrior who will fight in this challenge
      </p>

      <br />

      <CarouselContent>
        {heroes.map((hero, index) => (
          <CarouselItem key={index}>
            <ModalPlayer fighterHash={hero.fighterHash} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
