import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import usePokemonApi from './src/hooks/usePokemonApi';

export default function App() {
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  const getPokemonsList = useCallback(
    async (offset = 0) => {
      try {
        setIsLoading(true);
        const response = await api.listPokemons(offset);

        response.results.map((pokemon) => {
          setPokemons((prevState) => [...prevState, pokemon]);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [api]
  );

  useEffect(() => {
    getPokemonsList();
  }, [getPokemonsList]);

  console.log(pokemons);
  return (
    <View style={styles.container}>
      <Text>Pokedex</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
