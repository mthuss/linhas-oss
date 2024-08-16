import React, { useContext } from "react"
export const rptrans_api_host = "https://ww01.rptrans.com.br/api.rptrans/ws_api_rptrans/ws/"
export const rptrans_get_linhas = "linhas"
export const rpgrans_get_lastupdated = "ultimaAlteracao"
export const rpgrans_get_linhasHorarios = "LinhasHorarios"
import { Alert } from "react-native"
import LinhasContext from "./components/LinhasContext"

export function showError(err){
    console.error(err)
    if (err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err.response.data}`)
    } else {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
    }
}

export function isFavorited(item, favs){
    if(favs)
        return favs.filter(id => id === item).length != 0 ? true : false
    return false
}
