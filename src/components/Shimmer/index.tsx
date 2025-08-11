import React, { useEffect, useMemo } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SkeletonLoaderProps {
  backgroundColor?: string;
  borderRadius?: number;
  duration?: number;
  height?: number | string;
  shimmerColors?: [string, string, ...string[]];
  width?: number | string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = 200,
  height,
  borderRadius,
  backgroundColor = "#DFDDD7",
  shimmerColors = [
    "rgba(255, 255, 255, 0)",
    `rgba(255, 255, 255, 0.3)`,
    `rgba(255, 255, 255, 0.5)`,
  ] as const,
  duration = 1500,
}) => {
  const shimmerAnimationValue = React.useRef(new Animated.Value(0)).current;

  const normalizedWidth = typeof width === "string" ? parseFloat(width) : width;
  const normalizedHeight =
    typeof height === "string" ? parseFloat(height) : height;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnimationValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => {
      animation.stop();
      shimmerAnimationValue.setValue(0);
    };
  }, [shimmerAnimationValue, duration]);

  const shimmerStyle = useMemo(() => {
    const inputRange = [0, 1];
    const outputRange = [-normalizedWidth, normalizedWidth];

    return {
      width: normalizedWidth * 2,
      transform: [
        {
          translateX: shimmerAnimationValue.interpolate({
            inputRange,
            outputRange,
          }),
        },
      ],
    };
  }, [shimmerAnimationValue, normalizedWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          height: normalizedHeight,
          borderRadius,
          backgroundColor,
        },
      ]}
    >
      <Animated.View style={[styles.overlay, { borderRadius }]}>
        <Animated.View
          style={[
            styles.shimmer,
            shimmerStyle,
            { height: normalizedHeight, borderRadius },
          ]}
        >
          <LinearGradient
            colors={shimmerColors}
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  shimmer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
