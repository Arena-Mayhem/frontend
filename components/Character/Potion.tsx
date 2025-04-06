import { Button } from "@/components/ui/button";
import CarouselPotions from "./CarrouselPotions";

export default function Potion({ onConfirm }: { onConfirm?: () => void }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center relative h-fit ">
      <div className="md:w-1/2 mt-8 md:mt-0">
        <h1 className="text-3xl md:text-5xl text-white text-center md:text-left ">LASTLY SELECT YOUR POTION</h1>
        <p className="text-white text-sm md:text-base pt-4 md:pt-8 text-center md:text-left ">
          During the battle you can activate a potion to have more chances to
          win, this can be an attack, healing or speed potion.
        </p>
        <div className="hidden md:block mt-6">
        <Button
          onClick={onConfirm}
          variant="simple"
          className="px-10 py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
        >
          Select & Close
        </Button>
                </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:w-1/3 md:m-4">
        <CarouselPotions />
      </div>

      <div className="pt-4 w-full flex justify-center md:hidden">
        <Button
          onClick={onConfirm}
          variant="simple"
          className="px-10 py-2 h-auto text-clip bg-orange-400 to-amber-400 text-transparent bg-gradient-to-tl transition animate-duration-1100 animate-delay-2000 from-yellow-200 via-amber-700 bg-300% bg-clip-text animate-gradient animated-gradient gradient-border gap-3"
        >
          Select & Close
        </Button>
      </div>
    </div>
  );
}
