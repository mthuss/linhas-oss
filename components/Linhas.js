import React from "react";
import { Button, Text, View } from "react-native";
import Styles from "../Styles";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default LinhasMain = () => {
    function clearAllData() {
    AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => Alert.alert('success'));
}
    return (
        <View style={Styles.container}>
            <Text style={Styles.commonText}>Tela de Linhas !!!!</Text>
            {/* <Button title="Nuke" onPress={() => clearAllData()}/> */}
        </View>
    )
}