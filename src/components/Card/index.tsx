import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import usePokemonApi from "../../hooks/usePokemonApi";
import { Pokemon } from "pokenode-ts";
import { useStackNavigation } from "../../navigation/useStackNavigation";

interface CardProps {
  pokemonName: string;
}

const Card: React.FC<CardProps> = ({ pokemonName }) => {
  const { api } = usePokemonApi();
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useStackNavigation();
  const { width } = Dimensions.get("window");
  const cardWidth = (width - 40) / 3;

  useEffect(() => {
    async function getPokemonInfo() {
      setIsLoading(true);
      const response = await api.getPokemonByName(pokemonName);

      setPokemon(response);
      setIsLoading(false);
    }

    getPokemonInfo();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { width: cardWidth }]}
      onPress={() => navigation.navigate("Details", { pokemon })}
    >
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text style={{ alignSelf: "flex-end" }}>
              #{String(pokemon?.id).padStart(3, "0")}
            </Text>
            <Image
              source={{ uri: pokemon?.sprites.front_default }}
              alt="pokemon"
              style={{ width: 100, height: 100 }}
            />
            <Text>{pokemonName}</Text>
          </>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#ddd",
          borderRadius: 8,
          height: "40%",
          width: "100%",
          zIndex: 0,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  contentContainer: {
    zIndex: 1,
    padding: 8,
    alignItems: "center",
  },
});

export default Card;
