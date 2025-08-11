import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParamListBase } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../pages/Home";
import DetailsScreen from "../pages/Details";

const NavigationStack = createNativeStackNavigator<ParamListBase>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator id={undefined} initialRouteName="Home">
        <NavigationStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <NavigationStack.Screen
          name="Details"
          options={{ headerShown: false }}
          component={DetailsScreen}
        />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
