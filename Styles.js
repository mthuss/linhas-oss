import { StyleSheet } from "react-native";

export const colors = {
    commonText: "black",
    fadedText: "#a0a0a0",
    mainBg: "white",
    accent: "#85a79c",
    selected: "#b6cac4",
    selectedText: "#3f574f",
}

//                                       blue       orange 
export const itinerarioColors = ["#fff", "#458588", "#fe8019", "#cc241d", "#98971a", "#d3869b", "#fabd2f"]

export default Styles = StyleSheet.create({
        commonText: {
            color: colors.commonText
        },
        fadedText: {
            color: colors.fadedText,
            fontWeight: "bold"
        },
        linhaTitulo: {
            color: "black",
            fontWeight: "bold",
            fontSize: 18
        },
        container: {
            backgroundColor: "white",
            flex: 1,
        },
        innerContainer: {
            backgroundColor: "white",
            flex: 1,
            margin: 8,
        },
        header: {
            backgroundColor: colors.accent
        },
        customHeader: {
            backgroundColor: colors.accent,
            padding: 16,
            justifyContent: "center",
            height: "8%",
        },
        sectionHeader: {
            backgroundColor: colors.accent,
            padding: 16,
        },
        sectionHeaderText:{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: 18
        },
        headerText: {
            color: "#ffffff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20
        },
        periodoText: {
            textAlign: "center", 
            fontWeight: "bold", 
            fontSize: 18, 
            color: "#ffffff"
        },
        selectedText: {
            textAlign: "center", 
            fontWeight: "bold", 
            fontSize: 18, 
            color: colors.selectedText
        },
        itinerarioBadge: {
            borderStyle: "solid", 
            borderRadius: 50,
            borderWidth: 1, 
            height: 20,
            width: 20, 
            justifyContent: "center", 
            alignItems: "center", 
            alignContent: "center", 
            position: "absolute", 
            top: -6, 
            right: -6 
        },

    })