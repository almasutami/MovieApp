import 'react-native-gesture-handler';
import React from 'react'
import { Image,Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../screens/Home'
import DetailStat from '../screens/DetailStatus'
import DetailMov from '../screens/DetailMovie'

const Stack = createStackNavigator()
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const MainStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen component={Home} name="Home" options={{headerShown:false}} />
        <Stack.Screen component={DetailStat} name="DetailStat" options={{headerShown:false}} />
        <Stack.Screen component={DetailMov} name="DetailMov" options={{headerShown:false}} />
      </Stack.Navigator>
    )
}

export default MainStack
