import type { WithClassName } from "@/lib/types";
import Image from "next/image";

import { useHeroData } from "@/lib/heroes";
import { toFinitePositive } from "@/lib/numbers";
import { cn } from "@/lib/utils";

import { BsFillHeartPulseFill } from "react-icons/bs";
import { GiPointySword } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { GiShoulderArmor } from "react-icons/gi";

export type GenericOnChangeHandlers = {
  onChangeSpeed: (value: number) => void;
  onChangeAtack: (value: number) => void;
  onChangeDefense: (value: number) => void;
  onChangeHealth: (value: number) => void;
};

export default function ModalPlayer({
  fighterHash,
  ...props
}: Partial<
  GenericOnChangeHandlers & {
    fighterHash?: string;
  }
>) {
  const { challengesData, data: hero } = useHeroData(fighterHash || "");

  return (
    <article className="flex flex-row mx-auto bg-arena-black w-full  items-center justify-center  rounded-2xl ">
      <div className="rounded-[55px] bg-arena-bg items-center flex justify-center">
        <Image
          className=" rounded-xl w-[260px] object-cover h-[350px]"
          width={150}
          height={321}
          src={hero?.imageURL || "/shaman.png"}
          alt=""
        />
      </div>
      <div className=" flex flex-row-reverse items-center justify-between py-2 gap-16 ">
        <div className="flex flex-col gap-2 justify-between">
          <div className="text-3xl text-white px-4 w-full uppercase">
            {hero?.name || "Nameless Hero"}
          </div>

          <div className="flex flex-row gap-8 p-4">
            <p className="text-green-500 text-xl">
              V-{challengesData.totalWon}
            </p>
            <p className="text-red-500 text-xl">L-{challengesData.totalLost}</p>
          </div>

          <CharacterConfig
            defaultValues={{
              speed: hero?.spd,
              atack: hero?.atk,
              defense: hero?.def,
              health: hero?.hp,
            }}
            disabled={Boolean(fighterHash)}
            className="pl-4"
            {...props}
          />
        </div>
      </div>
    </article>
  );
}

export function CharacterConfig({
  defaultValues,
  onChangeAtack,
  onChangeDefense,
  onChangeHealth,
  onChangeSpeed,
  className,
  disabled,
}: WithClassName<
  Partial<GenericOnChangeHandlers> & {
    disabled?: boolean;
    defaultValues?: {
      speed?: number;
      atack?: number;
      defense?: number;
      health?: number;
    };
  }
>) {
  return (
    <div className={cn("grid gap-3 grid-cols-2", className)}>
      <ConfigInput
        disabled={disabled}
        defaultValue={defaultValues?.speed}
        onInput={onChangeSpeed}
        label="SPEED"
        icon={
          <GiRunningNinja className="text-arena-orange shrink-0 text-3xl" />
        }
      />

      <ConfigInput
        disabled={disabled}
        defaultValue={defaultValues?.atack}
        onInput={onChangeAtack}
        label="ATTACK"
        icon={<GiPointySword className="text-arena-orange shrink-0 text-3xl" />}
      />

      <ConfigInput
        disabled={disabled}
        defaultValue={defaultValues?.defense}
        onInput={onChangeDefense}
        label="DEFENSE"
        icon={
          <GiShoulderArmor className="text-arena-orange shrink-0 text-3xl" />
        }
      />

      <ConfigInput
        disabled={disabled}
        defaultValue={defaultValues?.health}
        onInput={onChangeHealth}
        label="HEALTH"
        icon={
          <BsFillHeartPulseFill className="text-arena-orange shrink-0 text-3xl" />
        }
      />
    </div>
  );
}

function ConfigInput({
  onInput,
  label,
  defaultValue,
  disabled,
  icon,
}: {
  onInput?: (value: number) => void;
  defaultValue?: number;
  disabled?: boolean;
  icon: JSX.Element;
  label: string;
}) {
  const DEFAULT_VALUE = `${defaultValue || 25}`;

  return (
    <div
      aria-note-dev="pack-text-icon"
      className="flex shrink-0 gap-2 div-oblicuo relative items-center gradient-border h-[4.5rem] px-4 flex-row"
    >
      <img
        src="/square.svg"
        className="absolute top-0 -left-0 pointer-events-none"
      />
      <img
        src="/square.svg"
        className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
      />

      {icon}

      <p className="text-white uppercase">{label}</p>

      <input
        disabled={disabled}
        value={disabled ? DEFAULT_VALUE : undefined}
        className="outline-none font-light border-orange-400 border-[1px] rounded-md  py-1 text-center w-24 text-white bg-transparent"
        onChange={(e) => onInput?.(toFinitePositive(Number(e.target.value)))}
        placeholder={DEFAULT_VALUE}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        type="text"
      />
    </div>
  );
}
