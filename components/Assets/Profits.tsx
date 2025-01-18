import Image from "next/image";

interface ProfitData {
  amount: string;
  date: string;
  against: string;
}

export default function Profits({ data }: { data: ProfitData[] }) {
  return (
    <div className="gradient-border-fino w-full">
      <div className="flex items-center gap-4 text-lg py-6 md:py-8 px-6 md:px-8">
        <Image
          src="/profit.svg"
          alt="profit"
          height={50}
          width={50}
          className="size-6"
        />
        <h1 className="text-white text-2xl">PROFITS</h1>
      </div>

      
      <div className="border-t-arena-orange border-t mx-8"></div>

      
      <div className="flex justify-center pt-6 pb-6 mx-0 md:mx-4 md:pb-0">
        <table className="w-4/5">
          <thead>
          <tr>
              <th className="text-white text-sm md:text-lg text-left pb-3">AMOUNT</th>
              <th className="text-white text-sm md:text-lg text-center pb-3">DATE</th>
              <th className="text-white text-sm md:text-lg text-right pb-3">AGAINST</th>
            </tr>
          </thead>
          <tbody>
            {data.map((profit, index) => (
              <tr key={index}>
                <td className="text-white text-xs md:text-sm">{profit.amount}</td>
                <td className="text-white text-xs md:text-sm text-center">{profit.date}</td>
                <td className="text-white text-xs md:text-sm text-right">{profit.against}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <div className="px-5 md:px-8 mt-8 md:mt-16 pb-5 md:pb-6">
        <div className="div-oblicuo bg-arena-black gradient-border relative">
      
          <img
            src="/square.svg"
            className="absolute top-0 left-0 pointer-events-none"
          />
          <img
            src="/square.svg"
            className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
          />

          
          <div className="flex items-center justify-center py-4">
            <h1 className="text-white text-base md:text-lg mr-2 md:mr-4">TOTAL PROFITS</h1>
            <Image
              src="/profit.svg"
              alt="profit"
              height={50}
              width={50}
              className="size-6"
            />
            <p className="text-white text-base md:text-lg">+1000 usdc</p>
          </div>
        </div>
      </div>
    </div>
  );
}
