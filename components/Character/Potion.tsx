import { Button } from "@/components/ui/button";
import CarouselPotions from "./CarrouselPotions";

export default function Potion({ onConfirm }: { onConfirm?: () => void }) {
  return (
    <div className="flex  mx-8 flex-row  items-center justify-center">
      <div className="w-full mx-8">
        <h1 className="text-5xl text-white">SELECT YOUR POTION</h1>

        <p className="text-white text-base pt-8">
          During the battle you can activate a potion to have more chances to
          win, this can be an attack, healing or speed potion.
          <br />
        </p>

        <Button
          onClick={onConfirm}
          variant="simple"
          className="px-10 mt-6 py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
        >
          Select & Close
        </Button>
      </div>

      <CarouselPotions />
    </div>
  );
}
