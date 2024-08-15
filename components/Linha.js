import React from "react";
import { Text, View } from "react-native";
import Styles from "../Styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({item}) => (
    <TouchableOpacity style={{borderColor: "#000000", borderWidth: 1, borderRadius: 10, borderStyle: "solid", padding: 16, margin: 8}}>
        <Text style={Styles.linhaTitulo}>{item.linha_logica} - {item.nome_linha}</Text>
        <Text style={[Styles.commonText,{marginTop: 8}]}>Próximo horário: </Text>
    </TouchableOpacity>
)