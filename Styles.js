import { StyleSheet } from "react-native";

export const colors = {
    commonText: "black",
    fadedText: "#a0a0a0",
    mainBg: "white",
    accent: "#85a79c",
}

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
        }


    })