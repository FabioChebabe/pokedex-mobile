import ShimmerPlaceHolder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';
import { Animated, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/index';
import SilhouetteIcon from '../../assets/icons/silhouette';
import { createRef, useEffect } from 'react';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const DetailsLoading = () => {
  const avatarRef = createRef();
  const firstLineRef = createRef();
  const secondLineRef = createRef();
  const thirdLineRef = createRef();
  useEffect(() => {
    const facebookAnimated = Animated.stagger(400, [
      avatarRef.current.getAnimated(),
      Animated.parallel([
        firstLineRef.current.getAnimated(),
        secondLineRef.current.getAnimated(),
        thirdLineRef.current.getAnimated(),
      ]),
    ]);
    Animated.loop(facebookAnimated).start();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.grayScale.wireframe,
        padding: 4,
        paddingTop: 202,
      }}
      mode="padding"
    >
      <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 8 }}>
        <View style={{ marginTop: -100, alignSelf: 'center' }}>
          <SilhouetteIcon />
        </View>

        <ShimmerPlaceholder ref={avatarRef} />
        <View style={{ justifyContent: 'space-between' }}>
          <ShimmerPlaceholder ref={firstLineRef} />
          <ShimmerPlaceholder ref={secondLineRef} />
          <ShimmerPlaceholder ref={thirdLineRef} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsLoading;
