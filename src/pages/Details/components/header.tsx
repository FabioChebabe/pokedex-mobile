import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import TextWrapped from "../../../components/Text";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../../theme";

interface HeaderProps {
  title: string;
  id: string;
  pokemonType: string;
  onGoBack?: () => void;
}

const Header = ({ pokemonType, onGoBack, title, id }: HeaderProps) => {
  return (
    <View style={[styles(pokemonType).header]}>
      <View style={styles().leftContainer}>
        <TouchableOpacity onPress={onGoBack}>
          <AntDesign name="arrowleft" size={32} color={"white"} />
        </TouchableOpacity>
        <TextWrapped typography="headline" color="white">
          {title}
        </TextWrapped>
      </View>
      <TextWrapped typography="subtitle2" color="white">
        {id}
      </TextWrapped>
    </View>
  );
};

const styles = (pokemonType?: string) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.pokemonType[pokemonType],
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 24,
      zIndex: 5,
    },
    leftContainer: {
      gap: 8,
      flexDirection: "row",
      alignItems: "center",
    },
  });

export default Header;
