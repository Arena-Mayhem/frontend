import Image from "next/image";
import PercentageDeposit, {
  type PercentageMultipiler,
} from "./PercentageDeposit";

function TokenInfo({
  tokenName,
  tokenImage,
}: {
  tokenName: string;
  tokenImage: string;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4 flex-grow w-full">
        <p className="text-base text-white">TOKEN</p>
        <div className="flex flex-row-reverse items-center gap-2">
          <p className="text-white text-base py-2">{tokenName}</p>
          <Image
            className="size-8"
            src={tokenImage}
            width={30}
            height={20}
            alt={tokenName}
          />
        </div>
      </div>
    </>
  );
}

export default function ConfirmDeposit({
  selectedToken,
  onSelectPercentage,
  ...props
}: React.HTMLProps<HTMLInputElement> & {
  selectedToken: { name: string; image: string; balance: string };
  onSelectPercentage?: (value: PercentageMultipiler) => void;
}) {
  const { name, image, balance } = selectedToken;

  return (
    <>
      <TokenInfo tokenName={name} tokenImage={image} />
      <label className="flex items-center w-full shadow-parriba gradient-border bg-arena-orange/20 backdrop-blur-sm">
        <input
          className="flex-grow outline-none w-full px-4 py-4 font-light text-white bg-transparent "
          placeholder={`0.0 ${name}`}
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          type="text"
          {...props}
        />
      </label>
      <p className="text-white text-right py-4"> Balance: {balance}</p>
      <PercentageDeposit onSelect={onSelectPercentage} />
    </>
  );
}
