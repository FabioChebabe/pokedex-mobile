import { View, Image, StyleSheet } from "react-native";
import Tag from "../../../../components/Tags";
import { PokemonTypeColorKeyType } from "../../../../theme";

interface ProfileSectionProps {
  pokemonImg: string;
  pokemonTypes: PokemonTypeColorKeyType[];
}

const ProfileSection = ({ pokemonImg, pokemonTypes }: ProfileSectionProps) => {
  return (
    <>
      <Image
        source={{ uri: pokemonImg }}
        alt="pokemon"
        style={styles.profilePicture}
      />
      <View style={styles.tagsContainer}>
        {pokemonTypes.map((type, idx) => (
          <Tag type={type} key={`${idx}-${type}`} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 16,
    paddingBottom: 16,
  },
});

export default ProfileSection;
