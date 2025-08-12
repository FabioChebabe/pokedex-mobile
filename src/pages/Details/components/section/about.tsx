import React from "react";
import { StyleSheet, View } from "react-native";
import TextWrapped from "../../../../components/Text";
import { theme } from "../../../../theme";
import InfoView from "../InfoView";
import { Pokemon } from "pokenode-ts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AboutSectionProps {
  pokemonType: string;
  pokemon: Pokemon;
  pokemonDescription?: string | null;
}

const AboutSection = ({
  pokemon,
  pokemonType,
  pokemonDescription,
}: AboutSectionProps) => {
  return (
    <>
      <TextWrapped
        typography="subtitle1"
        color={theme.colors.pokemonType[pokemonType]}
      >
        About
      </TextWrapped>
      <View style={sytles.infoContainer}>
        <InfoView
          content={`${pokemon.weight / 10} kg`}
          label="Weight"
          hasRightBorder
          icon={
            <MaterialCommunityIcons
              name="weight-kilogram"
              size={20}
              color="#555"
            />
          }
        />
        <InfoView
          icon={
            <MaterialCommunityIcons
              name="human-male-height"
              size={20}
              color="#555"
            />
          }
          content={`${pokemon.height / 10} m`}
          label="Heigh"
          hasRightBorder
        />
        <InfoView
          content={
            <View style={sytles.movesContainer}>
              {pokemon?.abilities?.map((ability) => (
                <TextWrapped
                  typography="body3"
                  color={theme.colors.grayScale.dark}
                  key={ability.ability.name}
                >
                  {ability.ability.name}
                </TextWrapped>
              ))}
            </View>
          }
          label="Moves"
        />
      </View>
      {!!pokemonDescription && (
        <TextWrapped typography="body3" style={sytles.description}>
          {pokemonDescription}
        </TextWrapped>
      )}
    </>
  );
};

const sytles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    height: 120,
  },
  movesContainer: {
    gap: 4,
  },
  description: {
    color: "#555",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
});

export default AboutSection;
