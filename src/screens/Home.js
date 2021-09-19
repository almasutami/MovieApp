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

class Home extends React.Component {
    state = {
        nowPlaying:[],
        popular:[],
        topRated:[],
        upcoming:[],
        statClicked:"",
    }

    fetchNowPlaying = () => {
        Axios.get(`${API_NOW_PLAYING}`)
        .then((result)=>{
            this.setState({nowPlaying: result.data.results})
        })
        .catch((err)=>{
            console.log("Error nowPlaying:", err)
        })   
    }
    
    fetchPopular = () => {
        Axios.get(`${API_POPULAR}`)
        .then((result)=>{
            this.setState({popular: result.data.results})
        })
        .catch((err)=>{
            console.log("Error popular:", err)
        })   
    }

    fetchTopRated = () => {
        Axios.get(`${API_TOP_RATED}`)
        .then((result)=>{
            this.setState({topRated: result.data.results})
        })
        .catch((err)=>{
            console.log("Error popular:", err)
        })   
    }
 
    fetchUpcoming = () => {
        Axios.get(`${API_UPCOMING}`)
        .then((result)=>{
            this.setState({upcoming: result.data.results})
        })
        .catch((err)=>{
            console.log("Error popular:", err)
        })   
    }

    componentDidMount(){
        this.fetchNowPlaying()
        this.fetchPopular()
        this.fetchTopRated()
        this.fetchUpcoming()
    }

    renderCarousel = (item) => {
        return(
            <View
                style={{
                    height: windowHeight/2.5,
                    width: windowWidth,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("DetailMov",item.item)}>
                    <Image
                        source={{uri: `${API_BACKDROP}`+`${item.item.backdrop_path}`}}
                        style={{ width: windowWidth*0.95, height: windowHeight/3,borderRadius:10}}
                    ></Image>
                </TouchableOpacity>
                <View style={{position:'absolute', top: 210, left: 0, right: 0, bottom: 0, marginHorizontal:windowWidth*0.05/2}}>
                    <H4 center bold backgroundColor="#rgba(0,0,0,0.3)" color="#fff">{item.item.title}</H4>
                </View>

            </View>

        )

    }

    renderHorList = (item) => {
        return(
            <View style={{display:'flex',flexDirection:'column'}}>
                <View
                    style={{
                        height: windowHeight/3.8,
                        width: windowWidth/3,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("DetailMov",item.item)}>
                        <Image
                            source={{uri: `${API_POSTER}`+`${item.item.poster_path}`}}
                            style={{ width: windowWidth*3/10, height: windowHeight/3.8,borderRadius:20,marginHorizontal:windowWidth*2.5/100}}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View>

        )

    }
    
    render(){
        return(
            <ScrollView style={{height:windowHeight*0.9, backgroundColor:"#010a12"}}>
                <ScrollView style={{marginTop:10, backgroundColor:"fff"}} >
                    <FlatList 
                        style={{flex:1}}
                        data={this.state.nowPlaying}
                        renderItem={item => this.renderCarousel(item)}
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={true}
                    />
                </ScrollView>

                <ScrollView style={{marginVertical:10}}>
                    <View style={{marginHorizontal:10,display:'flex',flexDirection:'row',alignContent:'center',justifyContent:'space-between'}}>
                        <H3 color="#fff" bold>Top Rated</H3>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailStat',{stat:"Top Rated Movies",data:this.state.topRated})} >
                            <Ionicons name="chevron-forward-circle-outline" size={25} color="#fff"  />
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        style={{flex:1}}
                        data={this.state.topRated}
                        renderItem={item => this.renderHorList(item)}
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>

                <ScrollView style={{marginVertical:10}}>
                    <View style={{marginHorizontal:10,display:'flex',flexDirection:'row',alignContent:'center',justifyContent:'space-between'}}>
                        <H3 color="#fff" bold>Popular</H3>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailStat',{stat:"Popular Movies",data:this.state.popular})} >
                            <Ionicons name="chevron-forward-circle-outline" size={25} color="#fff"  />
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        style={{flex:1}}
                        data={this.state.popular}
                        renderItem={item => this.renderHorList(item)}
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>

                <ScrollView style={{marginVertical:10}}>
                    <View style={{marginHorizontal:10,display:'flex',flexDirection:'row',alignContent:'center',justifyContent:'space-between'}}>
                        <H3 color="#fff" bold>Upcoming Movies</H3>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailStat',{stat:"Upcoming Movies",data:this.state.upcoming})}>
                            <Ionicons name="chevron-forward-circle-outline" size={25} color="#fff"  />
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        style={{flex:1}}
                        data={this.state.upcoming}
                        renderItem={item => this.renderHorList(item)}
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>



            </ScrollView>
        )
    }

    

}

export default Home
