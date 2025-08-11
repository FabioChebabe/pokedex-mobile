import { StyleSheet, View } from "react-native";
import { PokemonTypeColorKeyType, theme } from "../../theme";
import { formatString } from "../../utils/formatString";
import TextWrapped from "../Text";

interface TagProps {
  type: PokemonTypeColorKeyType;
}

const Tag = ({ type }: TagProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.pokemonType[type] },
      ]}
    >
      <TextWrapped typography="subtitle3" style={styles.label}>
        {formatString(type)}
      </TextWrapped>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  label: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default Tag;
