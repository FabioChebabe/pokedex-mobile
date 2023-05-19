import { useRoute } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import Tag from '../../components/Tags';

function DetailsScreen() {
  const { params } = useRoute();
  const theme = useTheme();
  const pokemonType = params.pokemon.types[0].type.name;

  console.log(params.pokemon.stats);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ backgroundColor: theme.colors.pokemonType[pokemonType] }}>
        <Text>Details Screen</Text>
        <Text>{params.pokemon.name}</Text>
        <Text>{params.pokemon.id}</Text>
      </View>
      <Image
        source={{ uri: params.pokemon?.sprites.front_default }}
        alt="pokemon"
        style={{ width: 100, height: 100 }}
      />
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {params.pokemon.types.map((type, idx) => (
          <Tag type={type.type.name} key={`${idx}-${type.type.name}`} />
        ))}
      </View>
      <Text style={{ color: theme.colors.pokemonType[pokemonType] }}>
        About
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'center' }}>
          <Text>{params.pokemon.weight}</Text>
          <Text>Weight</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text>{params.pokemon.height}</Text>
          <Text>Height</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text>{params.pokemon.weight}</Text>
          <Text>Weight</Text>
        </View>
      </View>
      <Text>Base stats</Text>
      {params.pokemon.stats.map((stat) => (
        <Text>
          {stat.stat.name} {'->'} {stat.base_stat}
        </Text>
      ))}
    </View>
  );
}
export default DetailsScreen;
