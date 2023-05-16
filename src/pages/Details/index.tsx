import { useRoute } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';

function DetailsScreen() {
  const { params } = useRoute();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
