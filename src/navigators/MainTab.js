import 'react-native-gesture-handler';
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import DiscStack from './DiscStack';
import MainStack from './MainStack';
import Auth from '../screens/Auth';

const BottomTab = createBottomTabNavigator()

const MainTab = () => {
    return(
        <BottomTab.Navigator
            screenOptions={({route})=>{
                return {
                tabBarIcon: ({focused, color, size}) =>{
                    let iconName;
        
                    if (route.name==="MainStack"){
                    iconName= focused? "home" : "home-outline"
                    
                    } else if (route.name==="DiscStack"){
                    iconName= focused? "search" : "search-outline"
        
                    } else if (route.name==="Auth"){
                        iconName= focused? "person-circle" : "person-circle-outline"
            
                    }
        
                    return <Ionicons name={iconName} size={size} color={color}/>
        
                }
                }
            }}
            tabBarOptions={{
                activeTintColor: "#fff",
                activeBackgroundColor:"#010a12",
                inactiveBackgroundColor:"#010a12",
                labelStyle: {
                    fontSize:12
                },
                style: {
                    elevation: 0,
                    borderTopWidth: 0
                }
            }}
        >
            <BottomTab.Screen component={MainStack} name="MainStack" options={{title:"Home"}} />
            <BottomTab.Screen component={DiscStack} name="DiscStack" options={{title:"Discover"}}/> 
            <BottomTab.Screen component={Auth} name="Auth" options={{title:"Profile"}}/>  
        </BottomTab.Navigator>
    )
}

export default MainTab
