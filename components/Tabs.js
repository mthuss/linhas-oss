import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Linhas from "./Linhas";
import Pontos from "./Pontos";
import Styles, { colors } from "../Styles";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinhasAdd from "./LinhasAdd";
import LinhaInfo from "./LinhaInfo";

const Tab = createBottomTabNavigator();
const LinhasStack = createStackNavigator();
const PontosStack = createStackNavigator();

const Title = (props) => (
    <View style={[Styles.container]}>
       <Icon name="flame" color="red" size={32}/> 
        <Text style={Styles.commonText}>{props.text}</Text>
       <Icon name="flame" color="red" size={32}/> 
    </View>
)

const LinhasScreen = props => (
    <LinhasStack.Navigator initialRouteName="ListaLinhas">
        <LinhasStack.Screen name="ListaLinhas" component={Linhas}
            options={{
                // headerRight: () => (
                //     <TouchableOpacity style={{marginRight: 16}} onPress={() => {props.navigation.navigate("LinhasAdd")}}>
                //         <Icon name="add-outline" color="black" size={24}/>
                //     </TouchableOpacity>
                // ),
                headerTitle: "Linhas",
                headerTitleAlign: "center",
                headerStyle: Styles.header
            }}
        />
        <LinhasStack.Screen name="LinhasAdd" component={LinhasAdd}
            options = {{
                headerTitle: "Adicionar Linha",
                headerTitleAlign: "center",
                headerStyle: Styles.header
            }}/>

        <LinhasStack.Screen name="LinhaInfo" component={LinhaInfo}
        options={{headerShown:false}}/>
    </LinhasStack.Navigator>
)

const PontosScreen = () => (
    <PontosStack.Navigator initialRouteName="ListaPontos">
        <PontosStack.Screen name="ListaPontos" component={Pontos} 
            options={{ headerTitle: "Pontos", headerTitleAlign: "center", headerStyle: Styles.header }}
        />
    </PontosStack.Navigator>
)

export default Tabs = props => (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { height: 64 },
        tabBarHideOnKeyboard: true,
        headerShown: false
    }}
        initialRouteName="Linhas"
    >
        <Tab.Screen name="Linhas" component={LinhasScreen}
            options={{
                tabBarIcon: ({ color, size }) => (<Icon name="bus-outline" color={color} size={size} />),

            }}
        />
        <Tab.Screen name="Pontos" component={PontosScreen}
            options={{ tabBarIcon: ({ color, size }) => (<Icon name="pin-outline" color={color} size={size} />) }}
        />
    </Tab.Navigator>
)