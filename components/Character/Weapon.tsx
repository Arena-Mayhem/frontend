import CarouselWeapons from "./CarrouselWeapons";
import SelectPotion from "./SelectPotion";

export default function Weapon() {
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <div className="w-1/2 ">
          <h1 className="text-5xl text-white">
            {" "}
            It's time to select YOUR WEAPON{" "}
          </h1>
          <p className="text-white text-base py-8">
            Choose your weapon wisely, each one has unique characteristics that
            will help you in battle.
            <br />
          </p>
          <SelectPotion />
        </div>
        <div className="flex  flex-row items-center justify-center w-1/3 m-4 ">
          <CarouselWeapons />
        </div>
      </div>
    </>
  );
}
