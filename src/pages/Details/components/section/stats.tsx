import { View } from "react-native";
import TextWrapped from "../../../../components/Text";
import { theme } from "../../../../theme";
import { PokemonStat } from "pokenode-ts";
import Stats from "../stats";

interface StatsSectionProps {
  pokemonType: string;
  pokemonStats: PokemonStat[];
}

const StatsSection = ({ pokemonStats, pokemonType }: StatsSectionProps) => {
  return (
    <>
      <TextWrapped
        typography="subtitle1"
        color={theme.colors.pokemonType[pokemonType]}
        style={{ marginBottom: 16 }}
      >
        Base stats
      </TextWrapped>
      {pokemonStats.map((stat) => (
        <Stats key={stat.stat.name} pokemonType={pokemonType} stat={stat} />
      ))}
    </>
  );
};

export default StatsSection;
