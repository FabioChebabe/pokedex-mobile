import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import Tag from '../../components/Tags';
import { SafeAreaView } from 'react-native-safe-area-context';
import usePokemonApi from '../../hooks/usePokemonApi';
import { useState } from 'react';

function DetailsScreen() {
  const { params } = useRoute();
  const [pokemon, setPokemon] = useState(params.pokemon);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const pokemonType = pokemon.types[0].type.name;
  const navigation = useNavigation();
  const { api } = usePokemonApi();

  const getNextPokemon = async () => {
    setLoading(true);
    const response = await api.getPokemonById(pokemon.id + 1);

    setPokemon(response);
    setLoading(false);
  };

  const getPreviousPokemon = async () => {
    setLoading(true);
    const response = await api.getPokemonById(pokemon.id - 1);

    setPokemon(response);
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.pokemonType[pokemonType],
      }}
    >
      <Button title="back" onPress={() => navigation.goBack()} />
      <View
        style={{
          backgroundColor: theme.colors.pokemonType[pokemonType],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Details Screen</Text>
        <Text>{pokemon.name}</Text>
        <Text>{pokemon.id}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{ uri: pokemon?.sprites.front_default }}
          alt="pokemon"
          style={{ width: 100, height: 100 }}
        />
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {pokemon.types.map((type, idx) => (
            <Tag type={type.type.name} key={`${idx}-${type.type.name}`} />
          ))}
        </View>
        <Text style={{ color: theme.colors.pokemonType[pokemonType] }}>
          About
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center' }}>
            <Text>{pokemon.weight}</Text>
            <Text>Weight</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>{pokemon.height}</Text>
            <Text>Height</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>{pokemon.weight}</Text>
            <Text>Weight</Text>
          </View>
        </View>
        <Text>Base stats</Text>
        {pokemon.stats.map((stat) => (
          <Text>
            {stat.stat.name} {'->'} {stat.base_stat}
          </Text>
        ))}
      </View>
      {pokemon?.id !== 1 && (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            top: '50%',
            left: 5,
          }}
          onPress={getPreviousPokemon}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          top: '50%',
          right: 5,
        }}
        onPress={getNextPokemon}
      >
        <Text>next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default DetailsScreen;
