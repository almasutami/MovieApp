import 'react-native-gesture-handler';
import React from 'react'
import { Image,Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Discover from '../screens/Discover'
import DetailMov from '../screens/DetailMovie'

const Stack = createStackNavigator()
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const MainStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen component={Discover} name="Discover" options={{headerShown:false}} />
        <Stack.Screen component={DetailMov} name="DetailMov" options={{headerShown:false}} />
      </Stack.Navigator>
    )
}

export default MainStack
