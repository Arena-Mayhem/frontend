import type { FighterData } from "@/lib/cartesi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { generateFighterHash, useHeroData, useHeroes } from "@/lib/heroes";
import { validateHeroConfig } from "@/components/Challenge/SelectChamp";
import ArenaInput from "@/components/ArenaInput";
import { CharacterConfig } from "@/components/Challenge/ModalPlayer";
import CarouselCharacter from "./CarouselCharacter";
import SelectWeapon from "./SelectWeapon";
import { Button } from "@/components/ui/button";

export default function CharacterCreation({
  onCreateHero,
  isEditingHeroHash,
}: {
  onCreateHero?: () => void;
  isEditingHeroHash?: string;
}) {
  const { data: editHeroData } = useHeroData(isEditingHeroHash || "");
  const [isModalWeaponOpen, setIsModalWeaponOpen] = useState(false);
  const [isWeaponSelected, setIsWeaponSelected] = useState(false);
  const [heroData, setHeroData] = useState({
    weapon: "sword", // Default weapon
  } as FighterData);
  const { appendHero, forceSetHeroes } = useHeroes();

  const partialSetHeroData = (partialData: Partial<FighterData>) => {
    setHeroData((prev) => ({ ...prev, ...partialData }));
  };

  function handleCreateHero() {
    if (!heroData?.name?.trim()) {
      return toast.error("Enter a name for your hero");
    }

    if (!validateHeroConfig(heroData)) return;

    if (isWeaponSelected) {
      if (editHeroData) {
        forceSetHeroes((prev) =>
          prev.map((hero) =>
            hero.fighterHash === editHeroData.fighterHash
              ? {
                  ...heroData,
                  fighterHash: generateFighterHash(heroData),
                }
              : hero
          )
        );
      } else appendHero(heroData);

      onCreateHero?.();
      return toast.success(
        `Hero ${editHeroData ? "updated" : "created"} successfully`
      );
    }

    setIsModalWeaponOpen(true);
  }

  useEffect(() => {
    if (editHeroData) {
      partialSetHeroData(editHeroData);
    }
  }, [editHeroData]);

  return (
    <>
      {/* Mobile Layout - Hidden on desktop */}
      <div className="flex flex-col w-full space-y-2 md:hidden">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl gradient-text-name-character">
            {editHeroData
              ? "Let's edit your hero data"
              : "It's time to customize your warrior!"}
          </h1>

          <p className="text-white text-xs md:text-base pt-2 md:pt-8">
            You have 100 points to distribute among their attributes, but be
            careful! Each one has a maximum of 40 points ⛔.
            <br />
            <br />
            Choose wisely to create a unique and powerful hero
          </p>
        </div>

        <div className="md:w-full">
          <CarouselCharacter
            onSkinSelected={({ imageURL }) => {
              partialSetHeroData({
                imageURL,
              });
            }}
          />
        </div>

        <div className="space-y-6">
          <ArenaInput
            value={heroData.name}
            onChange={(e) => {
              partialSetHeroData({
                name: e.target.value?.toLocaleUpperCase() || "",
              });
            }}
            className="uppercase w-full"
            placeholder="ENTER YOUR CHARACTER'S NAME"
          />

          <CharacterConfig
            defaultValues={{
              atack: editHeroData?.atk,
              defense: editHeroData?.def,
              health: editHeroData?.hp,
              speed: editHeroData?.spd,
            }}
            onChangeAtack={(atk) => partialSetHeroData({ atk })}
            onChangeDefense={(def) => partialSetHeroData({ def })}
            onChangeHealth={(hp) => partialSetHeroData({ hp })}
            onChangeSpeed={(spd) => partialSetHeroData({ spd })}
          />

          <div className="flex justify-center pt-1 md:pt-4">
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
                className="px:2 md:px-10 py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
              >
                {isWeaponSelected
                  ? isEditingHeroHash
                    ? "Update Hero"
                    : "Create Hero"
                  : "Continue"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original version, hidden on mobile */}
      <div className="hidden md:flex md:gap-2 md:gap-8 flex-row items-center justify-center">
        <div className="w-1/2 -mx-2">
          <h1 className="text-base md:text-5xl gradient-text-name-character">
            {editHeroData
              ? "Let's edit your hero data"
              : "It's time to customize your warrior!"}
          </h1>

          <p className="text-white text-xs md:text-base pt-1 md:pt-8">
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
                name: e.target.value?.toLocaleUpperCase() || "",
              });
            }}
            className="uppercase"
            placeholder="ENTER YOUR CHARACTER'S NAME"
          />

          <CharacterConfig
            defaultValues={{
              atack: editHeroData?.atk,
              defense: editHeroData?.def,
              health: editHeroData?.hp,
              speed: editHeroData?.spd,
            }}
            onChangeAtack={(atk) => partialSetHeroData({ atk })}
            onChangeDefense={(def) => partialSetHeroData({ def })}
            onChangeHealth={(hp) => partialSetHeroData({ hp })}
            onChangeSpeed={(spd) => partialSetHeroData({ spd })}
            className="mt-12 mb-6"
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
              className="md:px-10 md:py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
            >
              {isWeaponSelected
                ? isEditingHeroHash
                  ? "Update Hero"
                  : "Create Hero"
                : "Continue"}
            </Button>
          )}
        </div>
        <div className="flex flex-row items-center justify-center md:w-1/3 md:m-4">
          <CarouselCharacter
            onSkinSelected={({ imageURL }) => {
              partialSetHeroData({
                imageURL,
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
