import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "./types";

export const useStackNavigation = (): NativeStackNavigationProp<
  ParamListBase,
  keyof ParamListBase,
  undefined
> => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamListBase, keyof ParamListBase, undefined>
    >();

  return navigation as NativeStackNavigationProp<
    ParamListBase,
    keyof ParamListBase,
    undefined
  >;
};
