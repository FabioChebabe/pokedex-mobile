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
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { theme } from '../../theme';
import TextWrapped from '../../components/Text';

const HomeScreen = () => {
  const { api } = usePokemonApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>();
  const [sortOptions, setSortOptions] = useState([
    { label: 'Number', selected: false },
    { label: 'Name', selected: true },
  ]);

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
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => bottomSheetModalRef.current.present()}
          >
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['30%', '70%']}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={1}
            appearsOnIndex={2}
          />
        )}
        backgroundStyle={{ backgroundColor: theme.colors.identity.primary }}
      >
        <BottomSheetView style={{ padding: 8, gap: 16 }}>
          <TextWrapped
            typography="subtitle2"
            color={theme.colors.grayScale.white}
            style={{ paddingLeft: 16 }}
          >
            Sort by
          </TextWrapped>
          <FlatList
            data={sortOptions}
            contentContainerStyle={{
              flexGrow: 1,
              padding: 16,
              backgroundColor: 'white',
              borderRadius: 16,
              gap: 16,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
                onPress={() => {
                  setSortOptions((prevState) => {
                    const newArray = prevState.map((value) => {
                      if (value.label === item.label) {
                        return { label: value.label, selected: true };
                      }
                      return { label: value.label, selected: false };
                    });

                    return newArray;
                  });
                }}
              >
                <View
                  style={{
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    borderColor: theme.colors.identity.primary,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {item.selected && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: theme.colors.identity.primary,
                        borderRadius: 4,
                      }}
                    />
                  )}
                </View>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheetView>
      </BottomSheetModal>
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
    backgroundColor: 'white',
    marginBottom: 70,
    margin: 4,
    paddingBottom: 30,
    gap: 8,
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: theme.colors.identity.primary,
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
