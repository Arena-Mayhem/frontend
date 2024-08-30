import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BoxRandomType({
  icon,
  type,
  price,
  itemsUrlOne,
  itemsUrlTwo,
  itemsUrlThree,
  nameitemOne,
  nameitemTwo,
  nameitemThree,
  possiblePercentageOne,
  possiblePercentageTwo,
  possiblePercentageThree,
}: {
  icon: string;
  type: string;
  price: string;
  itemsUrlOne: string;
  itemsUrlTwo: string;
  itemsUrlThree: string;
  nameitemOne: string;
  nameitemTwo: string;
  nameitemThree: string;
  possiblePercentageOne: string;
  possiblePercentageTwo: string;
  possiblePercentageThree: string;
}) {
  return (
    <>
      <div className="gradient-border-fino items-center  flex justify-center flex-col my-8 relative w-[380px]">
        <Image
          src={icon}
          alt="icon"
          height={1000}
          width={1000}
          className="size-32 absolute top-0 -mt-16"
        />
        <div className="pt-16">
          <h1 className="text-2xl text-white text-center">RANDOM BOX </h1>
          <h1 className="text-5xl gradient-text-name-character text-center">
            {" "}
            {type}
          </h1>
        </div>
        <div
          aria-note-dev="caja-container-items"
          className="flex items-center py-8 justify-center"
        >
          <div
            aria-note-dev="caja-item-one"
            className="flex items-center justify-center flex-col"
          >
            <p className="text-white text-sm -mb-6 w-24 text-center">
              {nameitemOne}
            </p>
            <Image
              src={itemsUrlOne}
              alt="sword"
              height={1000}
              width={1000}
              className="size-36 animate-pulse "
            />
            <p className="text-white text-xs -mt-6">
              {possiblePercentageOne} ATACK{" "}
            </p>
          </div>
          <div
            aria-note-dev="caja-item-two"
            className="flex items-center justify-center flex-col"
          >
            <p className="text-white text-sm -mb-6 w-24 text-center">
              {nameitemTwo}
            </p>
            <Image
              src={itemsUrlTwo}
              alt="sword"
              height={1000}
              width={1000}
              className="size-36 animate-pulse"
            />
            <p className="text-white text-xs -mt-6">
              {possiblePercentageTwo} ATACK{" "}
            </p>
          </div>
          <div
            aria-note-dev="caja-item-three"
            className="flex items-center justify-center flex-col"
          >
            <p className="text-white text-sm -mb-6 w-24 text-center">
              {nameitemThree}
            </p>
            <Image
              src={itemsUrlThree}
              alt="sword"
              height={1000}
              width={1000}
              className="size-36 animate-pulse"
            />
            <p className="text-white text-xs -mt-6">
              {possiblePercentageThree} ATACK{" "}
            </p>
          </div>
        </div>
        <Button
          variant="arena-main"
          className="gradient-border items-center justify-center flex flex-row gap-2 my-8 w-[250px] h-12 sha py-4"
        >
          <p className="text-arena-orange">OPEN FOR</p>
          <p className="text-white">{price}</p>
        </Button>
      </div>
    </>
  );
}
