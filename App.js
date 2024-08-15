import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Styles from "./Styles";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/Tabs";
import { LinhasProvider } from "./components/LinhasContext";

export default App = () => {
  return (
    <LinhasProvider>
      <NavigationContainer>
        <SafeAreaView style={Styles.container}>
          <Tabs />
        </SafeAreaView>
      </NavigationContainer>
    </LinhasProvider>
  )
}
