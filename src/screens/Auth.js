import 'react-native-gesture-handler';
import React from 'react'
import { View, Image, FlatList , Dimensions, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'

import { H1,H2,H3,H4,CustomText } from "../components/Typography"
import Ionicons from 'react-native-vector-icons/Ionicons'

import Axios from 'axios'

const API_NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=a5bb84c5c214e580f932407bc8e1729c"
const API_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=a5bb84c5c214e580f932407bc8e1729c"
const API_TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=a5bb84c5c214e580f932407bc8e1729c"
const API_UPCOMING = "https://api.themoviedb.org/3/movie/upcoming?api_key=a5bb84c5c214e580f932407bc8e1729c"
const API_BACKDROP = "http://image.tmdb.org/t/p/w780/"
const API_POSTER = "http://image.tmdb.org/t/p/w154/"
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

class Auth extends React.Component {
    state = {
        nowPlaying:[],
        popular:[],
        topRated:[],
        upcoming:[],
        statClicked:"",
    }

    
    render(){
        return(
            <ScrollView style={{height:windowHeight*0.9, backgroundColor:"#010a12"}}>
                
                <View style={{alignItems:'center',marginTop:20,backgroundColor:"#ccc77c",marginHorizontal:windowWidth*0.08,borderTopLeftRadius:25,borderTopRightRadius:25,padding:20}}>
                    <Image
                      source={{uri:"https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png"}}
                      style={{ width: windowWidth*0.5, height: windowWidth*0.5, borderRadius:windowWidth*0.5,borderColor:"#f7f6f2",borderWidth:3}}
                    ></Image>
                    <H3>doraemon_2112</H3>
                    <TouchableOpacity style={{backgroundColor:"#010a12",padding:10,borderRadius:15}}>
                        <H4 color="#fff">Logout</H4>
                    </TouchableOpacity>
                </View>
                
                <View style={{backgroundColor:"#fff",borderTopStartRadius:25,borderTopEndRadius:25,paddingVertical:20,paddingHorizontal:50}}>
                    <TouchableOpacity style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                        <H3>Favorite Movies</H3>
                        <Ionicons style={{marginRight:5}} name="chevron-forward-circle-outline" size={20}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                        <H3>Watchlist</H3>
                        <Ionicons style={{marginRight:5}} name="chevron-forward-circle-outline" size={20}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                        <H3>Reviews</H3>
                        <Ionicons style={{marginRight:5}} name="chevron-forward-circle-outline" size={20}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:10}}>
                        <H3>FAQs</H3>
                        <Ionicons style={{marginRight:5}} name="chevron-forward-circle-outline" size={20}  />
                    </TouchableOpacity>
                    
                </View>



            </ScrollView>
        )
    }

    

}

export default Auth
