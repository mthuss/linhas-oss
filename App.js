import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Styles from "./Styles";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/Tabs";
import { LinhasProvider } from "./components/LinhasContext";
import { FavoritesProvider } from "./components/FavoritesContext";

export default App = () => {
  return (
    <LinhasProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <SafeAreaView style={Styles.container}>
            <Tabs />
          </SafeAreaView>
        </NavigationContainer>
      </FavoritesProvider>
    </LinhasProvider>
  )
}
