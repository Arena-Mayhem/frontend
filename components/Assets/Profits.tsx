import Image from "next/image";

interface ProfitData {
  amount: string;
  date: string;
  against: string;
}

export default function Profits({ data }: { data: ProfitData[] }) {
  return (
    <div className="gradient-border-fino w-full">
      <div className="flex items-center gap-4 text-lg py-8 px-8">
        <Image
          src="/profit.svg"
          alt="profit"
          height={50}
          width={50}
          className="size-4"
        />
        <h1 className="text-white text-2xl">PROFITS</h1>
      </div>
      <div className="border-t-arena-orange border-t-[1px] mx-8"></div>
      <div className="p-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-white text-left">Amount</th>
              <th className="text-white text-left">Date</th>
              <th className="text-white text-left">Against</th>
            </tr>
          </thead>
          <tbody>
            {data.map((profit, index) => (
              <tr key={index}>
                <td className="text-white">{profit.amount}</td>
                <td className="text-white">{profit.date}</td>
                <td className="text-white">{profit.against}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="div-oblicuo bg-arena-black  flex items-center justify-center gradient-border relative mt-16 ">
          <img
            src="/square.svg"
            className="absolute top-0 left-0 pointer-events-none"
          />
          <img
            src="/square.svg"
            className="absolute rotate-180 bottom-0 right-0 pointer-events-none"
          />
          <h1 className="py-4 text-white text-xl">TOTAL PROFITS </h1>
          <div className="flex items-center justify-center gap-4 text-lg py-4 px-8">
            <h1 className="text-white text-xl"> TOTAL PROFITS</h1>
            <Image
              src="/profit.svg"
              alt="profit"
              height={50}
              width={50}
              className="size-4"
            />
            <p className="text-white">1000 USDC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
