import React, { useContext, useState } from "react";
import Styles, {colors, itinerarioColors} from "../Styles";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { isFavorited } from "../common";
import FavoritesContext from "./FavoritesContext";


function compare(a,b) {
    if(moment(a.horario, "HH:mm") > moment(b.horario, "HH:mm"))
        return 1;
    if(moment(a.horario, "HH:mm") < moment(b.horario, "HH:mm"))
        return -1;
    return 0
}

function renderPeriodos(periodo, setPeriodo) {
    return(
        <View style={{ marginVertical: 16, marginHorizontal: 48, flexDirection: "row", justifyContent: "center"}}>
            <TouchableHighlight onPress={() => setPeriodo(1)} style={{ backgroundColor: periodo == 1 ? colors.selected : "#c0c0c0", padding: 16, borderTopLeftRadius: 6, borderBottomLeftRadius: 6}}>
                <Text style={periodo == 1 ? Styles.selectedText : Styles.periodoText}>DIAS ÚTEIS</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setPeriodo(2)} style={{ backgroundColor: periodo == 2 ? colors.selected : "#c0c0c0", padding: 16 }}>
                <Text style={periodo == 2 ? Styles.selectedText : Styles.periodoText}>SÁBADO</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setPeriodo(3)} style={{ backgroundColor: periodo == 3 ? colors.selected : "#c0c0c0", padding: 16, borderTopRightRadius: 6, borderBottomRightRadius: 6 }}>
                <Text style={periodo == 3 ? Styles.selectedText : Styles.periodoText}>DOM/FER</Text>
            </TouchableHighlight>
        </View>
    )
}

function renderItinerarios(itinerarios_list) {
    let list = []
    itinerarios_list.map(it =>
        list.push(
            <View style={{ marginRight: 4, borderStyle: "solid", borderRadius: 50, backgroundColor: itinerarioColors[it], borderWidth: 1, height: 20, width: 20, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                <Text style={{ textAlign: "center", fontWeight: "bold", flex: 1 }}>{it}</Text>
            </View>
        )
    )
    return(list)
}

export default props => {
    const [periodo, setPeriodo] = useState(1)
    const item = props.route.params.payload
    const onFavorite = props.route.params.onFavorite
    const itinerarios = item["itinerarios"]["itinerarios"]["itinerario"]
    const horarios = []
    const itinerarios_list = []
    const {favState} = useContext(FavoritesContext)
    const favorites = favState["favorites"]
    const isFavorite = isFavorited(item["id_linha"], favorites)
    // console.warn(itinerarios)
    for(let i = 0; i < itinerarios.length; i++)
    {
        if(itinerarios[i]["horarios"]["horarios"]["horario"])
        {
            let cd_iti_usuario = itinerarios[i]["cd_iti_usuario"]
            itinerarios_list.push(cd_iti_usuario)
            itinerarios[i]["horarios"]["horarios"]["horario"].map(hor => {
                // itinerarios[i]["horarios"]["horarios"]["horario"] = { itinerario: i, ...itinerarios[i]["horarios"]["horarios"]["horario"] }
                const horario = { itinerario: cd_iti_usuario, ...hor }
                // horarios.push(itinerarios[i]["horarios"]["horarios"]["horario"])
                horarios.push(horario)
            })
        }
    }
    horarios.sort(compare)
    // horarios.map(horario => console.log(horario.horario))
    // console.warn(itinerarios)
    return (
        <View style={Styles.container}>
            <View style={[Styles.customHeader,{flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center"}]}>
                <Text style={Styles.headerText}>{item.linha_logica} - {item.nome_linha}</Text>
                <TouchableOpacity onPress={onFavorite}>
                    <Icon name={isFavorite ? "star" : "star-outline"} color={isFavorite ? "gold" : "black"} size={24} />
                </TouchableOpacity>
            </View>
            {renderPeriodos(periodo, setPeriodo)}

            <View style={{ flex: 1 }}>
                <View style={Styles.sectionHeader}>
                    <Text style={Styles.sectionHeaderText}>Horários</Text>
                </View>
                <View style={{ marginTop: 16, marginLeft: 16, flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                    {itinerarios_list.length != 0 &&
                        <>
                            <Text style={{ color: colors.commonText, fontSize: 16 }}>Itinerarios: </Text>
                            <View style={{ flexDirection: "row" }}>
                                {renderItinerarios(itinerarios_list)}
                            </View>
                        </>
                    }
                </View>
                <View style={{ marginTop: 16, flex: 1, marginBottom: 0, alignSelf: "center" }}>
                    <FlatList data={horarios.filter(hor => hor.id_periodo == periodo)}
                        columnWrapperStyle={{ justifyContent: "flex-start" }}
                        keyExtractor={hor => hor.id_horario}
                        renderItem={hor => (
                            <View style={{ borderWidth: 1, borderStyle: "solid", borderColor: "black", margin: 8, marginHorizontal: 14, padding: 8 }}>
                                <View style={[Styles.itinerarioBadge, { backgroundColor: itinerarioColors[hor.item.itinerario] }]}>
                                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>{hor.item.itinerario}</Text>
                                </View>
                                <Text style={{ color: "black", textAlign: "center", fontSize: 24 }}>{hor.item.horario}</Text>
                            </View>
                        )}
                        numColumns={4}
                    />
                </View>
            </View>
        </View>
    )
}