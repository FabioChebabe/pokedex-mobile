import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme/index";
import SilhouetteIcon from "../../assets/icons/silhouette";
import { Skeleton } from "moti/skeleton";

const DetailsLoading = () => {
  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
      mode="padding"
      edges={["top"]}
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <SilhouetteIcon />
        </View>

        <View style={styles.loadingContainer}>
          <View style={styles.tagsContainer}>
            <Skeleton width={40} height={20} colorMode="light" />
            <Skeleton width={40} height={20} colorMode="light" />
          </View>
          <Skeleton width={"100%"} height={120} colorMode="light" />
          <Skeleton width={"100%"} height={40} colorMode="light" />
          <View style={styles.statsContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                width={"100%"}
                height={16}
                colorMode="light"
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: theme.colors.grayScale.wireframe,
    padding: 4,
    paddingTop: 202,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    marginTop: -100,
    alignSelf: "center",
  },
  loadingContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  statsContainer: {
    gap: 8,
  },
});

export default DetailsLoading;
