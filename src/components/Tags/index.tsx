import { Text, View } from 'react-native';
import { useTheme } from 'styled-components';

interface TagProps {
  type: string;
}

const Tag = ({ type }: TagProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: theme.colors.pokemonType[type],
      }}
    >
      <Text style={{ color: 'white' }}>{type}</Text>
    </View>
  );
};

export default Tag;
