import type { FighterData } from "./cartesi";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { sha256, toBytes } from "viem";
import { useChallenges } from "./queries";
import { useAccount } from "wagmi";

const atomHeroes = atomWithStorage(
  "platform.heroes",
  [] as Array<
    FighterData & {
      fighterHash: string;
    }
  >,
);

export const generateFighterHash = (fighter: FighterData) => {
  return sha256(
    toBytes(
      [
        fighter.name,
        fighter.weapon,
        fighter.hp,
        fighter.atk,
        fighter.def,
        fighter.spd,
      ].join("-"),
    ),
    "hex",
  );
};

export const useHeroes = () => {
  const [heroes, forceSetHeroes] = useAtom(atomHeroes);
  return {
    heroes,
    forceSetHeroes,
    appendHero: (hero: FighterData) => {
      const fighterHash = generateFighterHash(hero);

      forceSetHeroes((prev) => {
        const existsHero = prev.find((h) => h.fighterHash === fighterHash);

        if (existsHero) return prev;
        // Early return if hero already exists
        return [
          ...prev,
          {
            ...hero,
            fighterHash,
          },
        ];
      });
    },
  };
};

export const useHeroData = (fighterHash: string) => {
  const { address } = useAccount();
  const { challenges } = useChallenges();

  const FORMAT_ADDRESS = address?.toLocaleLowerCase() || "NONE";
  const [heroes] = useAtom(atomHeroes);

  const heroData =
    heroes.find((hero) => hero.fighterHash === fighterHash) || null;

  const fighterChallenges = challenges.filter(
    ({ fighter_hash: currentPlayerHash, players }) => {
      const [_, opponent] = players || [];
      const opponentHash = opponent ? generateFighterHash(opponent) : "NONE";
      return currentPlayerHash === fighterHash || opponentHash === fighterHash;
    },
  );

  const challengesWon = fighterChallenges.filter(
    ({ winner }) => winner?.address === FORMAT_ADDRESS,
  );

  const totalLost = fighterChallenges.filter(
    ({ winner, id }) =>
      winner?.address !== FORMAT_ADDRESS &&
      !challengesWon.some((challenge) => challenge.id === id),
  ).length;

  return {
    challengesData: {
      totalLost,
      totalWon: challengesWon.length,
      challenges: fighterChallenges,
    },
    data: heroData,
  };
};
