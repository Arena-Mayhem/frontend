export default function ArenaInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <label className="flex items-center w-full shadow-parriba gradient-border bg-arena-orange/20 backdrop-blur-sm">
      <input
        className="flex-grow outline-none w-full px-4 py-4 font-light text-white bg-transparent "
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        type="text"
        {...props}
      />
    </label>
  );
}
