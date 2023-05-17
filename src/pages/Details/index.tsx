import { useRoute } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { useTheme } from 'styled-components/native';

function DetailsScreen() {
  const { params } = useRoute();
  const theme = useTheme()
  const pokemonType = params.pokemon.types[0].type.name


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.pokemonType[pokemonType] }}>
      <Text>Details Screen</Text>
      <Text>{params.pokemon.name}</Text>
      <Text>{params.pokemon.id}</Text>
      <Image
        source={{ uri: params.pokemon?.sprites.front_default }}
        alt="pokemon"
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
export default DetailsScreen;
