import { useRoute } from "@react-navigation/native";
import { ParamList } from "./types";

export const useParams = <
  Route extends keyof ParamList,
>(): ParamList[Route] => {
  return (useRoute().params ?? {}) as ParamList[Route];
};
