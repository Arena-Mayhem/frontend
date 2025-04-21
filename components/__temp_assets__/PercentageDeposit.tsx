import { Button } from "../ui/button";

export type PercentageMultipiler = 0.25 | 0.5 | 0.75 | 1;

export default function PercentageDeposit({
  onSelect,
}: {
  onSelect?: (value: PercentageMultipiler) => void;
}) {
  return (
    <>
      <div className="gap-2 flex flex-grow items-center">
        <Button
          onClick={() => onSelect?.(0.25)}
          variant="simple"
          className="flex text-base flex-grow hover:bg-arena-orange/10 hover:text-arena-orange border-2 gradient-border-fino"
        >
          25%
        </Button>
        <Button
          onClick={() => onSelect?.(0.5)}
          variant="simple"
          className="flex text-base flex-grow hover:bg-arena-orange/10 hover:text-arena-orange border-2 gradient-border-fino"
        >
          50%
        </Button>
        <Button
          onClick={() => onSelect?.(0.75)}
          variant="simple"
          className="flex text-base flex-grow hover:bg-arena-orange/10  hover:text-arena-orange border-2 gradient-border-fino"
        >
          75%
        </Button>
        <Button
          onClick={() => onSelect?.(1)}
          variant="simple"
          className="flex text-base flex-grow hover:bg-arena-orange/10 border-2 gradient-border-fino"
        >
          MAX
        </Button>
      </div>
    </>
  );
}
