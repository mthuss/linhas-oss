import React, { useContext, useState } from "react";
import { Button, Switch, Text, View } from "react-native";
import Styles from "../Styles";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesContext from "./FavoritesContext";
import { FlatList } from "react-native-gesture-handler";
import LinhasContext from "./LinhasContext";
import { isFavorited } from "../common";
import Linha from "./Linha";

export default LinhasMain = props => {
    function clearAllData() {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => Alert.alert('success'));
    }
    const { state } = useContext(LinhasContext)
    const { favState, dispatch } = useContext(FavoritesContext)
    const [favorites, setFavoritesEnabled] = useState(true)
    const toggleFavorites = () => setFavoritesEnabled(previousState => !previousState)
    // console.log(state.linhas[0]["itinerarios"]["itinerarios"]["itinerario"][0]["horarios"]["horarios"])
    // console.warn(favState.favorites)
    if (state.linhas.length !== 0)
        return (
            <View style={Styles.container}>
                {/* <Button title="Nuke" onPress={() => clearAllData()}/> */}
                {/* <Button title="Add favorite" onPress={() => dispatch({type: "addFavorite", payload: Math.floor(Math.random() * 4000)})}/> */}
                {/* <Button title="Print favorites" onPress={() => console.warn(favState.favorites)} /> */}
                {/* <Button title="Reset favorites" onPress={() => dispatch({ type: "resetFavorites" })} /> */}
                <View style={[Styles.innerContainer]}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", margin: 8}}>
                        <Text style={[Styles.fadedText]}>Mostrar favoritos</Text>
                        <Switch onValueChange={toggleFavorites} value={favorites}/>
                    </View>
                    <FlatList data={favorites ? state.linhas.filter(linha => isFavorited(linha["id_linha"], favState.favorites)) : state.linhas}
                        keyExtractor={item => item["id_linha"]}
                        renderItem={(item) => <Linha item={item["item"]} 
                            onFavorite={() => dispatch({type: "toggleFavorite", payload: item["item"]["id_linha"]})}
                            favorites={favState.favorites}
                            navigation={props.navigation}
                            />}
                    />
                </View>
            </View>
        )
}