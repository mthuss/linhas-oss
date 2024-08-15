import axios from "axios";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { rptrans_api_host, rptrans_get_linhas, showError } from "../common";

async function getLinhas(){
    try{
        const linhas = await axios.post(rptrans_api_host + rptrans_get_linhas)
        // console.warn(linhas["data"]["linhas"]["linha"])
        const listaLinhas = linhas["data"]["linhas"]["linha"].map(item => ({id_linha: item.id_linha}))
        return listaLinhas
    }
    catch(e)
    {
        showError(e)
    }
}

export default LinhasAdd = props => {
const [linhas, setLinhas] = useState(null)
    (async () => {console.log(await getLinhas())})()
    return(
        <View>
            <Text>Adicionar Linhas!!!</Text>
        </View>
    )
}