import CarouselWeapons from "./CarrouselWeapons";
import SelectPotion from "./SelectPotion";

export default function Weapon({ onConfirm }: { onConfirm?: () => void }) {
  return (
<div className="flex flex-col md:flex-row items-center justify-center relative h-fit">
  <div className="w-1/2 mt-8 md:mt-0">
    <h1 className="text-3xl md:text-5xl text-white text-center md:text-left">NOW CHOOSE YOUR WEAPON</h1>
    <p className="text-white text-sm md:text-base pt-4 md:pt-8 text-center md:text-left">
      Choose your weapon wisely, each one has unique characteristics that will help you in battle.
    </p>
    <div className="hidden md:block mt-6">
          <SelectPotion onConfirm={onConfirm} />
        </div>
  </div>

  <div className="flex flex-col md:flex-row items-center justify-center md:w-1/3 md:m-4">
    <CarouselWeapons />
  </div>

  <div className="pt-4 w-full flex justify-center md:hidden">
    <SelectPotion onConfirm={onConfirm} />
  </div>
</div>
  );
}
