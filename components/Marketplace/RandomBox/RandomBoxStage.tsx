import BoxRandomType from "./BoxBasic";
import React from "react";
import EmblaCarousel from "../../ui/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "/app/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
export default function RandomBoxStage() {
  return (
    <>
      <div className="div-oblicuo relative pt-8 bg-arena-black gradient-border flex flex-wrap justify-center  w-full m-8 flex-row">
        <img
          src="/square.svg"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <img
          src="/square.svg"
          className="absolute rotate-180 bottom-0 pointer-events-none right-0"
        />
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </>
  );
}
