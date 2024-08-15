import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Styles from "./Styles";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/Tabs";

export default App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={Styles.container}>
        <Tabs/>
      </SafeAreaView>
    </NavigationContainer>
  )
}
