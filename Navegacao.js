import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Inicio from "./views/Inicio"
import Historico from "./views/Historico"
import teste from "./views/teste"


const Barra = createBottomTabNavigator();

function Barras() {
    return (

        <Barra.Navigator>
            <Barra.Screen name="Bem-Vindo" component={Inicio}/>
            <Barra.Screen name="Transações" component={Historico}/>
            <Barra.Screen name="Area de Teste" component={teste}/>
        </Barra.Navigator>

    );
}

export default function Navegacao() {

    return(

        <NavigationContainer>

            <Barras />

        </NavigationContainer>

    );
}