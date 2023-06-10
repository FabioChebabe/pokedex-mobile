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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  // const deferredSearcTerm = useDeferredValue(searchTerm);
  // const filteredPokemons = useMemo(
  //   () =>
  //     pokemons.filter((pokemon) =>
  //       pokemon.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  //     ),
  //   [pokemons, searchTerm]
  // );
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'red' }}
      mode="padding"
      edges={['top', 'left', 'right']}
    >
      <FlatList
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
          marginBottom: 70,
          margin: 4,
          paddingBottom: 30,
        }}
        data={pokemons}
        renderItem={({ item, index }) => (
          <Card
            pokemonId={`${index}`}
            pokemonName={item.name}
            key={item.name}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{ backgroundColor: 'red', padding: 12, paddingBottom: 16 }}
          >
            <Text>Pokedex</Text>
            <TextInput
              placeholder="Pokemon Name"
              style={{
                padding: 8,
                backgroundColor: 'white',
                borderRadius: 8,
                marginTop: 4,
              }}
              // value={searchTerm}
              // onChangeText={setSearchTerm}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={() => getPokemonsList(pokemons.length)}
            style={{
              padding: 16,
              backgroundColor: '#DB005B',
              borderRadius: 16,
              alignItems: 'center',
              margin: 16,
              marginTop: 24,
            }}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator /> : <Text>detail screen</Text>}
          </TouchableOpacity>
        )}
        // onEndReached={() => getPokemonsList(pokemons.length)}
        // onEndReachedThreshold={0.2}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
