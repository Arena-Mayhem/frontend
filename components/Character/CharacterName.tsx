import { SelectToken } from "../Challenge/Select";
import { CarouselCharacter } from "./CarouselCharacter";
import CharacterPoints from "./CharacterPoints";
import { Button } from "../ui/button";
import SelectWeapon from "./SelectWeapon";

export default function CharacterName() {
  return (
    <>
      <div className="flex gap-8 flex-row items-center justify-center">
        <div className="w-1/2 -mx-2 ">
          <h1 className="text-5xl gradient-text-name-character">
            It's time to select and customize your warrior!
          </h1>
          <p className="text-white text-base pt-8">
            You have 100 points to distribute among their attributes, but be
            careful! Each one has a maximum of 40 points ⛔.
            <br />
            <br />
            Choose wisely to create a unique and powerful hero
          </p>
          <br />
          <label className="flex items-center  shadow-parriba gradient-border bg-arena-orange/20 backdrop-blur-sm">
            <input
              className="flex-grow w-full px-4 py-4 font-light text-white bg-transparent "
              placeholder="ENTER YOUR CHARACTER'S NAME"
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              type="text"
            />
          </label>
          <CharacterPoints />
          <SelectWeapon />
        </div>
        <div className="flex flex-row items-center justify-center w-1/3 m-4 ">
          <CarouselCharacter />
        </div>
      </div>
    </>
  );
}
