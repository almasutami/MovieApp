import 'react-native-gesture-handler';
import React from 'react'
import { View, Image, Text, FlatList , Dimensions, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'

import { H1,H2,H3,H4,CustomText } from "../components/Typography"
import Ionicons from 'react-native-vector-icons/Ionicons'

import Axios from 'axios'

const API_BACKDROP = "http://image.tmdb.org/t/p/w780/"
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

class DetailMovie extends React.Component {
    state = {
        movieDetail:[]
    }

    fetchMovie = (id) => {
        Axios.get(`https://api.themoviedb.org/3/movie/`+`${id}`+`?api_key=a5bb84c5c214e580f932407bc8e1729c`)
        .then((result)=>{
            this.setState({movieDetail: result.data})
        })
        .catch((err)=>{
            console.log("Error genre:", err)
        })   
    }

    renderGenre = (item) => {
        return(
            <View style={{display:'flex',flexDirection:'column'}}>
                <View
                    style={{
                        // height: windowHeight/3.8,
                        // width: windowWidth/3,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity style={{borderRadius:10,backgroundColor:"rgba(235, 235, 235, 1)",padding:5,marginRight:5}}>
                        <H4>{item.item.name}</H4>
                    </TouchableOpacity>
                </View>
            </View>

        )

    }

    renderMovie = (id) => {
        this.fetchMovie(id)
        // console.log(this.state.movieDetail)
        return (
            <ScrollView>
                <View style={{marginHorizontal:10,marginTop:10}}>
                    <H2 bold color="rgba(255, 255, 186, 1)">{this.state.movieDetail.title}</H2>
                    {
                        this.state.movieDetail.release_date?
                        <H4 color="#fff">{this.state.movieDetail.release_date.slice(0,4)}</H4>
                        : null
                    }
                    
                </View>
                <Image
                    source={{uri: `${API_BACKDROP}`+`${this.state.movieDetail.backdrop_path}`}}
                    style={{ width: windowWidth, height: windowHeight/3,marginTop:10}}
                ></Image>
                <View style={{marginHorizontal:10,marginTop:5,paddingVertical:10}}>
                    <FlatList 
                        style={{flex:1}}
                        data={this.state.movieDetail.genres}
                        renderItem={item => this.renderGenre(item)}
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginHorizontal:10,borderColor:"#fff",borderStyle:'solid',borderBottomWidth:0.5,paddingTop:5,paddingBottom:10,justifyContent:'flex-start'}}>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginRight:15}}>
                        <Ionicons name="star" size={20} color="rgba(255, 255, 91, 1)" style={{marginRight:5}} />
                        <H4 color="#fff">{this.state.movieDetail.vote_average}/10 </H4>
                    </View>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginRight:15}}>
                        <Ionicons name="time-outline" size={20} color="rgba(0, 255, 34, 1)" style={{marginRight:5}} />
                        <H4 color="#fff">{this.state.movieDetail.runtime} mins </H4>
                    </View>

                </View>
                <View style={{marginHorizontal:10,marginTop:5,marginBottom:10}}>
                    <H4 bold color="#fff">Synopsis</H4>
                    <CustomText color="#fff">{this.state.movieDetail.overview}</CustomText>
                </View>
            </ScrollView>
        )
    }



    render(){
        const rootParams = this.props.route.params
        // console.log("root:",rootParams.id)

        return(
            <ScrollView style={{height:windowHeight*0.9, backgroundColor:"#010a12"}}>
                {this.renderMovie(rootParams.id)}
            </ScrollView>
        )
    }
}

export default DetailMovie