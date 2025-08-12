import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import usePokemonApi from "../../hooks/usePokemonApi";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DetailsLoading from "./Loading";
import { Pokemon } from "pokenode-ts";
import { PokemonTypeColorKeyType, theme } from "../../theme";
import { formatString } from "../../utils/formatString";
import Header from "./components/header";
import ProfileSection from "./components/section/profile";
import AboutSection from "./components/section/about";
import StatsSection from "./components/section/stats";
import navigation from "../../navigation";

type DetailsScreenRouteProp = RouteProp<
  { Details: { pokemon: Pokemon } },
  "Details"
>;

function DetailsScreen() {
  const { params } = useRoute<DetailsScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const [pokemon, setPokemon] = useState(params.pokemon);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const pokemonType = pokemon?.types[0].type.name;
  const navigation = useNavigation();
  const { api } = usePokemonApi();
  const getPokemonSpecies = async (pokemonId: number) => {
    const responsePokemonSpecies = await api.getPokemonSpeciesById(pokemonId);

    setPokemonDescription(
      responsePokemonSpecies.flavor_text_entries[0].flavor_text
        .replace(/\s+/g, " ")
        .trim()
    );
  };

  const getNextPokemon = async () => {
    setLoading(true);
    const response = await api.getPokemonById(pokemon.id + 1);
    getPokemonSpecies(pokemon.id + 1);
    setPokemon(response);
    setLoading(false);
  };

  const getPreviousPokemon = async () => {
    setLoading(true);
    const response = await api.getPokemonById(pokemon.id - 1);
    getPokemonSpecies(pokemon.id - 1);
    setPokemon(response);
    setLoading(false);
  };

  useEffect(() => {
    if (params.pokemon) {
      getPokemonSpecies(params.pokemon.id);
    }
  }, [params.pokemon]);

  if (loading) {
    return <DetailsLoading />;
  }

  return (
    <SafeAreaView
      style={styles(pokemonType).safeAreaContainer}
      mode="padding"
      edges={["top"]}
    >
      <ScrollView
        style={styles().scrollContainer}
        contentContainerStyle={{
          justifyContent: "space-between",
          paddingBottom: insets.bottom || 16,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Header
          id={`#${String(pokemon?.id).padStart(3, "0")}`}
          title={formatString(pokemon.name)}
          pokemonType={pokemonType}
          onGoBack={() => navigation.goBack()}
        />
        <View style={styles(pokemonType).header} />
        <View style={styles().container}>
          <View style={styles().contentContainer}>
            <ProfileSection
              pokemonImg={pokemon?.sprites.front_default}
              pokemonTypes={pokemon.types.map(
                (type) => type.type.name as PokemonTypeColorKeyType
              )}
            />
            <AboutSection
              pokemon={pokemon}
              pokemonType={pokemonType}
              pokemonDescription={pokemonDescription}
            />
            <StatsSection
              pokemonStats={pokemon.stats}
              pokemonType={pokemonType}
            />
          </View>
        </View>

        {pokemon?.id !== 1 && (
          <TouchableOpacity
            style={[
              styles().arrowIcon,
              {
                left: 5,
              },
            ]}
            onPress={getPreviousPokemon}
          >
            <AntDesign name="left" size={32} color={"white"} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles().arrowIcon,
            {
              right: 5,
            },
          ]}
          onPress={getNextPokemon}
        >
          <AntDesign name="right" size={32} color={"white"} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (pokemonType?: string) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.colors.pokemonType[pokemonType],
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: "white",
    },
    header: {
      backgroundColor: theme.colors.pokemonType[pokemonType],
      height: 100,
    },
    container: {
      backgroundColor: "white",
      flex: 1,
      borderRadius: 8,
    },
    contentContainer: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      flex: 1,
      marginTop: -100,
    },
    arrowIcon: {
      position: "absolute",
      top: "15%",
    },
  });

export default DetailsScreen;
