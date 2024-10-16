import { cn } from "@/lib/utils";

export default function ArenaInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center w-full shadow-parriba gradient-border bg-arena-orange/20 backdrop-blur-sm">
      <input
        className={cn(
          "flex-grow outline-none w-full px-4 py-4 font-light text-white bg-transparent",
          className,
        )}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        type="text"
        {...props}
      />
    </label>
  );
}
