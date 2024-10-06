"use client";

import Navbar from "@/components/Navigation/Navbar";
import StageBar from "@/components/Challenge/StageBar";

import NavBarAssets from "@/components/Assets/NavBarAssets";

export default function Balance() {
  return (
    <>
      <Navbar />
      <StageBar image="/assets.png" title="ASSETS" />
      <div className="flex md:flex-row flex-col">
        <NavBarAssets />
        <div className="bg-arena-bg p-8 m-8 border border-b-[0.1px] border-white/20 rounded-lg w-full shadow-padentro  ">
          <div className="div-oblicuo-inventory p-8 bg-arena-black  gradient-border relative border-b-2">
            Token Faucet
          </div>
        </div>
      </div>
    </>
  );
}
