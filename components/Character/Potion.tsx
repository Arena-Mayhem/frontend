import { SelectToken } from "../Challenge/Select";
import CarouselPotions from "./CarrouselPotions";

export default function Potion() {
  return (
    <>
      <div className="flex  mx-8 flex-row  items-center justify-center">
        <div className="w-full mx-8">
          <h1 className="text-5xl text-white"> Select YOUR POTION </h1>
          <p className="text-white text-base pt-8">
            During the battle you can activate a potion to have more chances to
            win, this can be an attack, healing or speed potion.
            <br />
          </p>
        </div>
        <CarouselPotions />
      </div>
    </>
  );
}
