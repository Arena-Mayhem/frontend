import { Button } from "../ui/button";
import { SelectToken } from "../Challenge/Select";

export default function Total() {
  return (
    <>
      <div className=" items-center border-y-[1px] border-arena-cyan justify-between flex flex-col sm:flex-row lg:max-w-[56rem] mx-auto">
        <div className="px-8 py-4 border-r-2 border-dashed border-arena-cyan">
          <p className="text-arena-green py-2 text-center">PROFIT</p>
          <div className="flex flex-row gap-16 ">
            <div>
              <p className="text-arena-orange">Ammount</p>
              <p className="text-white">3 USDC</p>
              <p className="text-white">5 USDC</p>
            </div>
            <div>
              <p className="text-arena-orange">Date</p>
              <p className="text-white">06/07/2024</p>
              <p className="text-white">01/06/2024</p>
            </div>
            <div>
              <p className="text-arena-orange">Against</p>
              <p className="text-white">cory.eth</p>
              <p className="text-white">yamir.eth</p>
              <br />
              <p className="text-arena-orange">Total: </p>
            </div>
          </div>
        </div>

        <div className="px-8 border-t-2	sm:border-t-0 py-4 border-l-2 border-dashed border-arena-cyan">
          <p className="text-red-500 text-center py-2">LOSSES</p>
          <div className="flex flex-row gap-16 ">
            <div>
              <p className="text-arena-orange">Ammount</p>
              <p className="text-white">3 USDC</p>
              <p className="text-white">1 USDC</p>
            </div>
            <div>
              <p className="text-arena-orange">Date</p>
              <p className="text-white">06/07/2024</p>
              <p className="text-white">02/07/2024</p>
            </div>
            <div>
              <p className="text-arena-orange">Against</p>
              <p className="text-white">harry.eth</p>
              <p className="text-white">yamir.eth</p>
              <br />
              <p className="text-arena-orange">Total: </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
