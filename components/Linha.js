import React from "react";
import { Text, View } from "react-native";
import Styles from "../Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

function getProximoHorario(item) {
    const currentTime = moment()
    const itinerarios = item["itinerarios"]["itinerarios"]["itinerario"]
    var lista_horarios = []
    itinerarios.map(it => {
        const horario = it["horarios"]["horarios"]["horario"]
        if(horario)
        {
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

export default ({item}) => {
    return(
    <TouchableOpacity style={{borderColor: "#000000", borderWidth: 1, borderRadius: 10, borderStyle: "solid", padding: 16, margin: 8}}>
        <Text style={Styles.linhaTitulo}>{item.linha_logica} - {item.nome_linha}</Text>
        <Text style={[Styles.commonText,{marginTop: 8}]}>Próximo horário: {getProximoHorario(item)}</Text>
    </TouchableOpacity>
)
}