import React, { createContext, useEffect, useReducer } from "react";
import { rpgrans_get_lastupdated, rpgrans_get_linhasHorarios, rptrans_api_host, rptrans_get_linhas, showError } from "../common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LinhasContext = createContext({})
const initialState = {linhas: null, last_updated: null}

const fetchLastUpdated = async () => {
    try{
        const lastUpdated = await axios.post(rptrans_api_host + rpgrans_get_lastupdated)
        return lastUpdated["data"]
    }
    catch(e)
    {
        showError(e)
    }
}

const fetchLatestUpdate = async () => {
    try{
        const lastUpdated = await AsyncStorage.getItem('lastUpdated')
        return JSON.parse(lastUpdated)
    }
    catch(e){
        showError(e)
    }
}

const fetchLinhas = async () => {
    try{
        // const linhas = await axios.post(rptrans_api_host + rptrans_get_linhas)
        const linhas = await axios.post(rptrans_api_host + rpgrans_get_linhasHorarios)
        return linhas["data"]["linhas"]
    }catch(e)
    {
        showError(e)
    }
}

async function saveLinhas(linhas, last_updated){
    try{
        await AsyncStorage.setItem('linhas', JSON.stringify(linhas))
        await AsyncStorage.setItem('lastUpdated', JSON.stringify(last_updated))
    }
    catch(e)
    {
        showError(e)
    }
}

async function retrieveLinhas(){
    try{
        const linhas = await AsyncStorage.getItem('linhas')
        return JSON.parse(linhas)
    }
    catch(e)
    {
        showError(e)
    }
}
export const LinhasProvider = props => {
    useEffect(() => {
        async function checkForUpdates() {
            try {
                const lastModified = await fetchLastUpdated() //fetch remote lastest update date
                const mostRecentUpdate = await fetchLatestUpdate() //fetch local latest update date
                if (mostRecentUpdate == null) //has never fetched the lists
                {
                    console.warn("First time")
                    const linhas = await fetchLinhas()
                    if (linhas)
                        dispatch({ type: "saveLinhas", payload: { linha: [...linhas.linha], last_updated: lastModified } })
                }
                else if (lastModified != mostRecentUpdate) //list has since been modified
                {
                    console.warn("Fetching updated linhas")
                    const linhas = await fetchLinhas()
                    if (linhas)
                        dispatch({ type: "saveLinhas", payload: { linha: [...linhas.linha], last_updated: lastModified } })
                }
                else //list has not been modified
                {
                    console.warn("Fetching local list")
                    const linhas = await retrieveLinhas()
                    if (linhas)
                        dispatch({ type: "loadLinhas", payload: { linha: linhas, last_updated: lastModified } })
                }
            }
            catch (e) {
                showError(e)
            }
        }
        checkForUpdates()
    }, [])
    function reducer(state, action) {
        switch (action.type) {
            case "saveLinhas": {
                const linhas = action.payload.linha
                const last_updated = action.payload.last_updated
                saveLinhas(linhas, last_updated)
                return { linhas: linhas, last_updated: last_updated }
            }
            case "loadLinhas": {
                const linhas = action.payload.linha
                const last_updated = action.payload.last_updated
                return {linhas: linhas, last_updated: last_updated}
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <LinhasContext.Provider value={{ state, dispatch }}>
            {props.children}
        </LinhasContext.Provider>
    )
}

export default LinhasContext