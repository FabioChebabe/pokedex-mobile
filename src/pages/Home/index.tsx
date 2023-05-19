import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePokemonApi from '../../hooks/usePokemonApi';
import Card from '../../components/Card';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const shouldlog = useRef(true);
  const insets = useSafeAreaInsets();

  const getPokemonsList = useCallback(
    async (offset = 0) => {
      try {
        if (!isLoading) {
          setIsLoading(true);
          const response = await api.listPokemons(offset);

          response.results.map((pokemon) => {
            setPokemons((prevState) => [...prevState, pokemon]);
          });
        }
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
      style={{ backgroundColor: 'red', paddingTop: insets.top }}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: 'gray',
      }}
      data={pokemons}
      renderItem={({ item, index }) => (
        <Card pokemonId={`${index}`} pokemonName={item.name} key={item.name} />
      )}
      ListHeaderComponent={() => (
        <View style={{ padding: 16, backgroundColor: 'red' }}>
          <Text>Home Screen</Text>
        </View>
      )}
      ListFooterComponent={() =>
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <Text>detail screen</Text>
          </TouchableOpacity>
        )
      }
      onEndReached={() => getPokemonsList(pokemons.length)}
      onEndReachedThreshold={0.2}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
};

export default HomeScreen;
