import React from "react";
import { StyleSheet, View } from "react-native";
import TextWrapped from "../../../components/Text";
import { theme } from "../../../theme";

interface InfoViewProps {
  content: React.ReactNode | string;
  label: string;
  icon?: React.ReactNode;
  hasRightBorder?: boolean;
}

const InfoView = ({
  content,
  icon,
  label,
  hasRightBorder = false,
}: InfoViewProps) => {
  const isStringContent = typeof content === "string";
  return (
    <View
      style={[
        styles.container,
        {
          borderRightWidth: hasRightBorder ? 0.5 : 0,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          flex: 0.8,
        }}
      >
        {!!icon && icon}
        {isStringContent ? (
          <TextWrapped typography="body3" color={theme.colors.grayScale.dark}>
            {content}
          </TextWrapped>
        ) : (
          content
        )}
      </View>
      <TextWrapped typography="caption" color={theme.colors.grayScale.medium}>
        {label}
      </TextWrapped>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRightColor: "#ccc",
  },
  content: {
    marginTop: 4,
    marginBottom: 2,
    textAlign: "center",
  },
});

export default InfoView;
