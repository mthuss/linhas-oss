import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Linhas from "./Linhas";
import Pontos from "./Pontos";
import { colors } from "../Styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default Tabs = () => (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { height: 64 },
        tabBarHideOnKeyboard: true,
    }}>
        <Tab.Screen name="Linhas" component={Linhas}
            options={{tabBarIcon: ({color, size}) => (<Ionicons name="calendar" color={"black"} size={32}/>) }}
        />
        <Tab.Screen name="Pontos" component={Pontos} />
    </Tab.Navigator>
)