import axios from "axios";
import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { rptrans_api_host, rptrans_get_linhas, showError } from "../common";
import Styles from "../Styles";
import Linha from "./Linha";
import { FlatList } from "react-native-gesture-handler";
import LinhasContext from "./LinhasContext";

export default LinhasAdd = props => {
    const {state} = useContext(LinhasContext)
    // console.warn(state.linhas)
    return(
        <View style={Styles.container}>
            <FlatList data={state.linhas}
            keyExtractor={item => item["id_linha"]}
            renderItem={(item) => <Linha item={item["item"]}/>}
            />
        </View>
    )
}