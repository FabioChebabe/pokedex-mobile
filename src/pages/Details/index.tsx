import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import Tag from '../../components/Tags';
import { SafeAreaView } from 'react-native-safe-area-context';
import usePokemonApi from '../../hooks/usePokemonApi';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DetailsLoading from './Loading';

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
        <DetailsLoading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.pokemonType[pokemonType],
      }}
      mode="padding"
      edges={['top', 'right', 'left']}
    >
      <View style={{ flex: 1, padding: 4, justifyContent: 'space-between' }}>
        <View
          style={{
            backgroundColor: theme.colors.pokemonType[pokemonType],
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 24,
            zIndex: 5,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={32} color={'white'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>
            {pokemon.name}
          </Text>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>
            #{pokemon?.id.toString().padStart(3, '0').slice(-3)}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.pokemonType[pokemonType],
            height: 100,
          }}
        />

        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              flex: 1,
              marginTop: -350,
            }}
          >
            <Image
              source={{ uri: pokemon?.sprites.front_default }}
              alt="pokemon"
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
            />
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {pokemon.types.map((type, idx) => (
                <Tag type={type.type.name} key={`${idx}-${type.type.name}`} />
              ))}
            </View>
            <Text
              style={{
                color: theme.colors.pokemonType[pokemonType],
                fontSize: 14,
                fontWeight: '700',
              }}
            >
              About
            </Text>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 24,
                alignItems: 'center',
              }}
            >
              <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
                <Text>{pokemon.weight}</Text>
                <Text>Weight</Text>
              </View>
              <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
                <Text>{pokemon.height}</Text>
                <Text>Height</Text>
              </View>
              <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
                {pokemon?.abilities?.map((ability) => (
                  <Text key={ability.ability.name}>{ability.ability.name}</Text>
                ))}
                <Text>Moves</Text>
              </View>
            </View>
            <Text
              style={{
                color: theme.colors.pokemonType[pokemonType],
                fontSize: 14,
                fontWeight: '700',
              }}
            >
              Base stats
            </Text>
            {pokemon.stats.map((stat) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 8,
                }}
              >
                <Text>
                  {stat.stat.name} {'->'} {stat.base_stat}
                </Text>
                <View
                  style={{
                    width: 200,
                    height: 8,
                    backgroundColor: `${theme.colors.pokemonType[pokemonType]}33`,
                  }}
                >
                  <View
                    style={{
                      width: stat.base_stat,
                      height: 8,
                      backgroundColor: theme.colors.pokemonType[pokemonType],
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        {pokemon?.id !== 1 && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: '15%',
              left: 5,
            }}
            onPress={getPreviousPokemon}
          >
            <AntDesign name="left" size={32} color={'white'} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '15%',
            right: 5,
          }}
          onPress={getNextPokemon}
        >
          <AntDesign name="right" size={32} color={'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default DetailsScreen;
