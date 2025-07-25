import { NavigationContainer } from "@react-navigation/native";


import { StackNavigator } from "./stack.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <StackNavigator />

    </NavigationContainer>
  )
}