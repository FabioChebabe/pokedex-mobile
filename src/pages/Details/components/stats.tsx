import { PokemonStat } from "pokenode-ts";
import { StyleSheet, View } from "react-native";
import TextWrapped from "../../../components/Text";
import { theme } from "../../../theme";

interface StatsProps {
  pokemonType: string;
  stat: PokemonStat;
}

const Stats = ({ stat, pokemonType }: StatsProps) => {
  const statusAbreviation = {
    hp: "hp",
    attack: "atk",
    defense: "def",
    "special-attack": "satk",
    "special-defense": "sdef",
    speed: "spd",
  };

  return (
    <View style={styles().container} key={stat.stat.name}>
      <View style={styles().labelContainer}>
        <TextWrapped
          typography="subtitle3"
          color={theme.colors.pokemonType[pokemonType]}
          style={styles().label}
        >
          {statusAbreviation[stat.stat.name].toUpperCase()}{" "}
        </TextWrapped>
        <View style={styles().separator} />
        <TextWrapped
          typography="body3"
          color={theme.colors.grayScale.dark}
          style={styles().statValue}
          align="left"
        >
          {`${("00" + stat.base_stat).slice(-3)}`}
        </TextWrapped>
      </View>
      <View style={styles(pokemonType).statBarContainer}>
        <View
          style={[styles(pokemonType).statsBar, { width: stat.base_stat }]}
        />
      </View>
    </View>
  );
};

const styles = (pokemonType?: string) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 8,
    },
    labelContainer: {
      width: "30%",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    label: {
      paddingHorizontal: 12,
    },
    separator: {
      width: 1,
      backgroundColor: theme.colors.grayScale.light,
    },
    statValue: {
      paddingHorizontal: 12,
      minWidth: 45,
    },
    statBarContainer: {
      width: "70%",
      height: 8,
      backgroundColor: `${theme.colors.pokemonType[pokemonType]}33`,
      borderRadius: 8,
      overflow: "hidden",
    },
    statsBar: {
      height: 8,
      backgroundColor: theme.colors.pokemonType[pokemonType],
    },
  });

export default Stats;
