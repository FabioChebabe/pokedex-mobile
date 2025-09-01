import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import usePokemonApi from "../../hooks/usePokemonApi";
import Card from "../../components/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import PokeballIcon from "../../assets/icons/pokeball";
import { theme } from "../../theme";
import Feather from "@expo/vector-icons/build/Feather";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const shouldlog = useRef(true);

  const getPokemonsList = useCallback(
    async (offset = 0) => {
      try {
        if (!isLoading) {
          setIsLoading(true);
          const response = await api.listPokemons(offset, 21);

          setPokemons((prevState) => {
            const newPokemons = response.results.filter(
              (p) => !prevState.some((prev) => prev.name === p.name),
            );
            return [...prevState, ...newPokemons];
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [api, isLoading],
  );

  useEffect(() => {
    if (shouldlog.current) {
      shouldlog.current = false;
      getPokemonsList();
    }
  }, []);

  const handleSearchPokemonById = async () => {
    try {
      setIsSearching(true);
      if (searchTerm.length > 0) {
        const response = await api.getPokemonByName(searchTerm);
        setFilteredPokemons([response]);
      }
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: `Pokemon ${searchTerm} not found`,
        text2: "Please check name and try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFilteredPokemons([]);
    }
  }, [searchTerm]);

  return (
    <SafeAreaView
      style={styles.wrapper}
      mode="padding"
      edges={["top", "left", "right"]}
    >
      <View style={styles.headerContainer}>
        <View
          style={[
            styles.headerContainer,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <PokeballIcon />
          <Text style={styles.title}>Pokedex</Text>
        </View>
        <View style={styles.headerLowerContainer}>
          <TextInput
            placeholder="Search by name"
            style={styles.input}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={handleSearchPokemonById}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={styles.sortButton}
            onPress={handleSearchPokemonById}
            disabled={isSearching}
          >
            {isSearching ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.identity.primary}
              />
            ) : (
              <Feather
                name="search"
                size={16}
                color={theme.colors.identity.primary}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          contentContainerStyle={styles.container}
          numColumns={3}
          columnWrapperStyle={{ gap: 8 }}
          data={filteredPokemons.length ? filteredPokemons : pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Card pokemonName={item.name} key={item.name} />
          )}
          ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
          onEndReached={() => {
            if (!isLoading) {
              getPokemonsList(pokemons.length);
            }
          }}
          onEndReachedThreshold={0.2}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.identity.primary,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 16,
    marginBottom: 70,
    paddingBottom: 30,
    gap: 8,
    alignItems: "center",
  },
  headerContainer: {
    backgroundColor: theme.colors.identity.primary,
    padding: 12,
    paddingBottom: 16,
    gap: 12,
    width: "100%",
  },
  headerUpperContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "white",
  },
  headerLowerContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  input: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    flex: 1,
  },
  sortButton: {
    borderRadius: 999,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

export default HomeScreen;
