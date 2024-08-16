import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer } from "react";
import { isFavorited, showError } from "../common";

const FavoritesContext = createContext({})
const initialState = {favorites: []}

async function fetchFavorites(){
    try{
        const favorites = await AsyncStorage.getItem('favorites')
        return JSON.parse(favorites)
    }
    catch(e){
        showError(e)
    }
}

async function saveFavorites(favorites){
    try{
        await AsyncStorage.setItem('favorites',JSON.stringify(favorites))
    }
    catch(e){
        showError(e)
    }
}

function removeFavorite(id, favorites){
    console.warn(favorites)
}

export const FavoritesProvider = props => {
    useEffect(() => {
        async function getFavorites(){
            try{
                const favorites = await fetchFavorites()
                if(favorites == null)
                {
                    console.warn("No favorites yet")
                    dispatch({type: "loadFavorites", payload: []})
                }
                else
                    dispatch({ type: "loadFavorites", payload: favorites })
                // console.warn(favState.favorites)
            }
            catch(e)
            {
                showError(e)
            }
        }
        getFavorites()
    },[])
    function reducer(favState, action)
    {
        switch(action.type){
            case "loadFavorites": {
                const favorites = action.payload
                return {favorites: [...favorites]}
            }
            case "addFavorite": {
                const newFavorite = action.payload
                const updatedFavorites = [...favState.favorites, newFavorite]
                saveFavorites(updatedFavorites)
                return {favorites: updatedFavorites}
            }
            case "resetFavorites": {
                saveFavorites([])
                return {favorites: []}
            }
            case "toggleFavorite": {
                const id = action.payload
                var updatedFavorites
                if(isFavorited(id, favState.favorites))
                {
                    // updatedFavorites = removeFavorite(id, favState.favorites)
                    updatedFavorites = favState.favorites.filter(fav_id => fav_id !== id)
                }
                else
                    updatedFavorites = [...favState.favorites, id]
                saveFavorites(updatedFavorites)
                return{favorites: updatedFavorites}
            }
        }
    }

    const [favState, dispatch] = useReducer(reducer, initialState)
    return(
        <FavoritesContext.Provider value={{favState, dispatch}}>
            {props.children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContext