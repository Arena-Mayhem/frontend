import type { FighterData } from "@/lib/cartesi";

import { useState } from "react";
import { toast } from "sonner";
import { useHeroes } from "@/lib/heroes";

import { CharacterConfig } from "@/components/Challenge/ModalPlayer";
import ArenaInput from "@/components/ArenaInput";
import { Button } from "@/components/ui/button";
import { validateHeroConfig } from "@/components/Challenge/SelectChamp";

import CarouselCharacter from "./CarouselCharacter";
import SelectWeapon from "./SelectWeapon";

export default function CharacterCreation({
  onCreateHero,
}: {
  onCreateHero?: () => void;
}) {
  const [isModalWeaponOpen, setIsModalWeaponOpen] = useState(false);
  const [isWeaponSelected, setIsWeaponSelected] = useState(false);
  const [heroData, setHeroData] = useState({} as FighterData);
  const { appendHero } = useHeroes();

  const partialSetHeroData = (partialData: Partial<FighterData>) => {
    setHeroData((prev) => ({ ...prev, ...partialData }));
  };

  function handleCreateHero() {
    if (!heroData?.name?.trim()) {
      return toast.error("Enter a name for your hero");
    }

    if (!validateHeroConfig(heroData)) return;

    if (isWeaponSelected) {
      appendHero(heroData);
      onCreateHero?.();
      return toast.success("Hero created successfully");
    }

    setIsModalWeaponOpen(true);
  }

  return (
    <div className="flex gap-8 flex-row items-center justify-center">
      <div className="w-1/2 -mx-2 ">
        <h1 className="text-5xl gradient-text-name-character">
          It's time to customize your warrior!
        </h1>

        <p className="text-white text-base pt-8">
          You have 100 points to distribute among their attributes, but be
          careful! Each one has a maximum of 40 points ⛔.
          <br />
          <br />
          Choose wisely to create a unique and powerful hero
        </p>

        <br />

        <ArenaInput
          value={heroData.name}
          onChange={(e) => {
            partialSetHeroData({
              name: e.target.value?.toLocaleUpperCase()?.trim() || "",
            });
          }}
          className="uppercase"
          placeholder="ENTER YOUR CHARACTER'S NAME"
        />

        <CharacterConfig
          onChangeAtack={(atk) => partialSetHeroData({ atk })}
          onChangeDefense={(def) => partialSetHeroData({ def })}
          onChangeHealth={(hp) => partialSetHeroData({ hp })}
          onChangeSpeed={(spd) => partialSetHeroData({ spd })}
          className="mt-4 mb-6"
        />

        {isModalWeaponOpen ? (
          <SelectWeapon
            onConfirm={() => {
              setIsWeaponSelected(true);
              setIsModalWeaponOpen(false);
            }}
          />
        ) : (
          <Button
            onClick={handleCreateHero}
            variant="simple"
            className="px-10 py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
          >
            {isWeaponSelected ? "Create Hero" : "Continue"}
          </Button>
        )}
      </div>
      <div className="flex flex-row items-center justify-center w-1/3 m-4 ">
        <CarouselCharacter
          onSkinSelected={({ imageURL }) => {
            partialSetHeroData({
              imageURL,
            });
          }}
        />
      </div>
    </div>
  );
}
