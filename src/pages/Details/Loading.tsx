import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/index';
import { StatusBar } from 'expo-status-bar';

const DetailsLoading = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.pokemonType.normal,
      }}
      mode="padding"
      edges={['top', 'left', 'right']}
    >
      <StatusBar backgroundColor={theme.colors.pokemonType.normal} />
      <ShimmerPlaceHolder visible={true}>
        <Text>Wow, awesome here.</Text>
      </ShimmerPlaceHolder>
    </SafeAreaView>
  );
};

export default DetailsLoading;
