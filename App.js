import 'react-native-gesture-handler';
import React from 'react'
import { Image,Dimensions } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './src/screens/Home'
import Discover from './src/screens/Discover'
import Detail from './src/screens/DetailMovie'
import MainTab from './src/navigators/MainTab'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator()
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const App = () => {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={MainTab} name="Tab" 
            options={{
              title: "MovieApp",
              headerStyle:{
                backgroundColor:"#010a12",
                height:windowHeight*0.07
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: "Poppins-Bold",
                fontSize:30
              },
              headerLeft: () => {
                return (
                  <Image
                      source={require('./src/assets/images/logo3.png')}
                      style={{ marginLeft:10, width: windowWidth*0.08, height: windowWidth*0.1}}
                  ></Image>
                )
              },
              headerRight: () => {
                return (
                  <TouchableOpacity >
                    <Ionicons name="person-circle-outline" size={30} color="#fff" 
                      style={{ marginRight:10, width: windowWidth*0.08, height: windowWidth*0.08}}
                    />
                  </TouchableOpacity>

                )
              }
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App
