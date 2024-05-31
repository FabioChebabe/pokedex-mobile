import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import Tag from '../../components/Tags';
import { SafeAreaView } from 'react-native-safe-area-context';
import usePokemonApi from '../../hooks/usePokemonApi';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DetailsLoading from './Loading';
import TextWrapped from '../../components/Text';

function DetailsScreen() {
  const { params } = useRoute();
  const [pokemon, setPokemon] = useState(params.pokemon);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const pokemonType = pokemon.types[0].type.name;
  const navigation = useNavigation();
  const { api } = usePokemonApi();
  const { width } = Dimensions.get('window');
  const aboutBoxWidth = (width - 50) / 3;
  const statusAbreviation = {
    hp: 'hp',
    attack: 'atk',
    defense: 'def',
    'special-attack': 'satk',
    'special-defense': 'sdef',
    speed: 'spd',
  };

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
            <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 16 }}>
              {pokemon.types.map((type, idx) => (
                <Tag type={type.type.name} key={`${idx}-${type.type.name}`} />
              ))}
            </View>
            <TextWrapped
              typography="subtitle1"
              color={theme.colors.pokemonType[pokemonType]}
            >
              About
            </TextWrapped>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  width: aboutBoxWidth,
                  gap: 16,
                }}
              >
                <TextWrapped
                  typography="body3"
                  color={theme.colors.grayScale.dark}
                >
                  {pokemon.weight}
                </TextWrapped>
                <TextWrapped
                  typography="caption"
                  color={theme.colors.grayScale.medium}
                >
                  Weight
                </TextWrapped>
              </View>
              <View
                style={{ width: 1, height: '100%', backgroundColor: 'gray' }}
              />
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  width: aboutBoxWidth,
                  gap: 16,
                }}
              >
                <TextWrapped
                  typography="body3"
                  color={theme.colors.grayScale.dark}
                >
                  {pokemon.height}
                </TextWrapped>
                <TextWrapped
                  typography="caption"
                  color={theme.colors.grayScale.medium}
                >
                  Height
                </TextWrapped>
              </View>
              <View
                style={{ width: 1, height: '100%', backgroundColor: 'gray' }}
              />
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  width: aboutBoxWidth,
                  gap: 16,
                }}
              >
                <View style={{ gap: 4 }}>
                  {pokemon?.abilities?.map((ability) => (
                    <TextWrapped
                      typography="body3"
                      color={theme.colors.grayScale.dark}
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </TextWrapped>
                  ))}
                </View>
                <TextWrapped
                  typography="caption"
                  color={theme.colors.grayScale.medium}
                >
                  Moves
                </TextWrapped>
              </View>
            </View>
            <TextWrapped
              typography="subtitle1"
              color={theme.colors.pokemonType[pokemonType]}
              style={{ marginBottom: 16 }}
            >
              Base stats
            </TextWrapped>
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
                <View
                  style={{
                    width: '30%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <TextWrapped
                    typography="subtitle3"
                    color={theme.colors.pokemonType[pokemonType]}
                    style={{ paddingHorizontal: 12 }}
                  >
                    {statusAbreviation[stat.stat.name].toUpperCase()}{' '}
                  </TextWrapped>
                  <View
                    style={{
                      height: 10,
                      width: 1,
                      backgroundColor: theme.colors.grayScale.light,
                    }}
                  />
                  <TextWrapped
                    typography="body3"
                    color={theme.colors.grayScale.dark}
                    style={{
                      paddingHorizontal: 12,
                      minWidth: 45,
                    }}
                    align="left"
                  >
                    {`${('00' + stat.base_stat).slice(-3)}`}
                  </TextWrapped>
                </View>
                <View
                  style={{
                    width: '70%',
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
