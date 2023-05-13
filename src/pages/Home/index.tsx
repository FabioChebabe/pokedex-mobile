import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePokemonApi from '../../hooks/usePokemonApi';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const shouldlog = useRef(true);

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
    if (shouldlog.current) {
      getPokemonsList();
      shouldlog.current = false;
    }
  }, [getPokemonsList]);

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      data={pokemons}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      ListHeaderComponent={() => <Text>Home Screen</Text>}
      ListFooterComponent={() => (
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <Text>detail screen</Text>
        </TouchableOpacity>
      )}
      onEndReached={() => getPokemonsList(pokemons.length)}
    />
  );
};

export default HomeScreen;
