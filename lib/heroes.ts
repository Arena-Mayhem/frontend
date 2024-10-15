import { atomWithStorage } from "jotai/utils";
import { FighterData } from "./cartesi";
import { useAtom } from "jotai";

const atomHeroes = atomWithStorage(
  "platform.heroes",
  [] as Array<
    FighterData & {
      fighterHash: string;
    }
  >,
);

export const useHeroes = () => {
  const [heroes, forceSetHeroes] = useAtom(atomHeroes);
  return {
    heroes,
    forceSetHeroes,
    appendHero: (hero: FighterData & { fighterHash: string }) => {
      forceSetHeroes((prev) => {
        const existsHero = prev.find(
          ({ fighterHash }) => fighterHash === hero.fighterHash,
        );

        if (existsHero) return prev;
        // Early return if hero already exists
        return [...prev, hero];
      });
    },
  };
};

export const useHeroData = (fighterHash: string) => {
  const [heroes] = useAtom(atomHeroes);
  return {
    data: heroes.find((hero) => hero.fighterHash === fighterHash) || null,
  };
};
