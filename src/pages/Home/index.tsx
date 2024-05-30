import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
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
import PokeballIcon from '../../assets/icons/pokeball';
import { Feather } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ),
    [pokemons, searchTerm]
  );
  const shouldlog = useRef(true);
  const insets = useSafeAreaInsets();

  const getPokemonsList = useCallback(
    async (offset = 0) => {
      try {
        if (!isLoading) {
          setIsLoading(true);
          const response = await api.listPokemons(offset, 21);

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
    [api, isLoading]
  );

  useEffect(() => {
    if (shouldlog.current) {
      getPokemonsList();
      shouldlog.current = false;
    }
  }, []);

  return (
    <SafeAreaView
      style={styles.wrapper}
      mode="padding"
      edges={['top', 'left', 'right']}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerContainer}>
          <PokeballIcon />
          <Text style={styles.title}>Pokedex</Text>
        </View>
        <View style={styles.headerLowerContainer}>
          <TextInput
            placeholder="Search"
            style={styles.input}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity style={styles.sortButton}>
            <Feather name="hash" size={16} color={'red'} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        contentContainerStyle={styles.container}
        numColumns={3}
        columnWrapperStyle={{ gap: 8 }}
        data={pokemons}
        renderItem={({ item, index }) => (
          <Card
            pokemonId={`#${('00' + (index + 1)).slice(-3)}`}
            pokemonName={item.name}
            key={item.name}
          />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    marginBottom: 70,
    margin: 4,
    paddingBottom: 30,
    gap: 8,
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: 'red',
    padding: 12,
    paddingBottom: 16,
    gap: 12,
    width: '100%',
  },
  headerUpperContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: 'white',
  },
  headerLowerContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  input: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    flex: 1,
  },
  sortButton: {
    borderRadius: 999,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default HomeScreen;
