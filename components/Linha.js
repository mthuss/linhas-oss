import React, { useContext } from "react";
import { Text, View } from "react-native";
import Styles from "../Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import FavoritesContext from "./FavoritesContext";
import Icon from "react-native-vector-icons/Ionicons";
import { isFavorited } from "../common";

function getHorariosPorPeriodo(horarios) {
    let dotw = moment().day()
    var periodo
    switch(dotw){
        case 0:
            periodo = 3
        case 6:
            periodo = 2
        default:
            periodo = 1
    }
    return horarios.filter(hor => hor["id_periodo"] == periodo)
}

function getProximoHorario(item) {
    const currentTime = moment()
    const itinerarios = item["itinerarios"]["itinerarios"]["itinerario"]
    var lista_horarios = []
    getHorariosPorPeriodo(lista_horarios)
    itinerarios.map(it => {
        const horario_completo = it["horarios"]["horarios"]["horario"]
        if(horario_completo)
        {
            const horario = getHorariosPorPeriodo(horario_completo)
            const idx = horario.findIndex(hor => {
                const hora = moment(hor["horario"], "HH:mm")
                return hora >= currentTime
            })
            if (idx != -1)
                lista_horarios.push(moment(horario[idx]["horario"], "HH:mm"))
        }
    })
    if(lista_horarios.length !== 0)
        return moment.min(lista_horarios).format("HH:mm")
    else return "Não disponível"
}

export default ({ item, onPress, onFavorite, favorites, navigation}) => {
    // const {dispatch} = useContext(FavoritesContext)
    const isFavorite = isFavorited(item["id_linha"], favorites)
    return (
        // <TouchableOpacity style={{borderColor: "#000000", borderWidth: 1, borderRadius: 10, borderStyle: "solid", padding: 16, margin: 8}} onPress={() => dispatch({type: "addFavorite", payload: item.id_linha})}>
        <TouchableOpacity style={{ borderColor: "#000000", borderWidth: 1, borderRadius: 10, borderStyle: "solid", padding: 16, marginVertical: 8 }} 
        onPress={() => navigation.navigate("LinhaInfo", {payload: item, onFavorite: onFavorite, favorites: favorites})}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View>
                    <Text style={Styles.linhaTitulo}>{item.linha_logica} - {item.nome_linha}</Text>
                    <Text style={[Styles.commonText, { marginTop: 8 }]}>Próximo horário: {getProximoHorario(item)}</Text>
                </View>
                <TouchableOpacity onPress={onFavorite}>
                    <Icon name={isFavorite ? "star" : "star-outline"} color={isFavorite ? "gold" : "black"} size={24}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}