import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import usePokemonApi from '../../hooks/usePokemonApi';
import Card from '../../components/Card';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearcTerm = useDeferredValue(searchTerm);
  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(deferredSearcTerm.toLocaleLowerCase())
      ),
    [pokemons, deferredSearcTerm]
  );
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
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: 'red', paddingTop: insets.top, flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: 'gray',
        paddingBottom: 70,
      }}
      data={filteredPokemons}
      renderItem={({ item, index }) => (
        <Card pokemonId={`${index}`} pokemonName={item.name} key={item.name} />
      )}
      ListHeaderComponent={() => (
        <View style={{ padding: 16, backgroundColor: 'red' }}>
          <Text>Pokedex</Text>
          <TextInput
            placeholder="Pokemon Name"
            style={{
              padding: 8,
              backgroundColor: 'white',
              borderRadius: 8,
              marginTop: 4,
            }}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
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
      // onEndReached={() => getPokemonsList(pokemons.length)}
      // onEndReachedThreshold={0.2}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
};

export default HomeScreen;
