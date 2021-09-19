import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, Image,FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TextInput, StyleSheet,Dimensions } from 'react-native'
import { H1,H2,H3,H4,CustomText } from "../components/Typography"
import Ionicons from 'react-native-vector-icons/Ionicons'

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

import Axios from 'axios'

const API_POSTER = "http://image.tmdb.org/t/p/w154/"
const API_GENRE = "https://api.themoviedb.org/3/genre/movie/list?api_key=a5bb84c5c214e580f932407bc8e1729c"
const API_ALL_MOVIE = "https://api.themoviedb.org/3/discover/movie?api_key=a5bb84c5c214e580f932407bc8e1729c&sort_by=popularity.desc&page="
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

class Discover extends React.Component {
    state = {
        genre:[],
        movieList:[],
        searchGenreHandler:28,
        searchToggle:false,
        searchMovieName:"",
        movieName:[],
    }

    fetchGenre = () => {
        Axios.get(`${API_GENRE}`)
        .then((result)=>{
            this.setState({genre: result.data.genres})
        })
        .catch((err)=>{
            console.log("Error genre:", err)
        })   
    }

    fetchMovieByGenre = () => {
        let array = []
        for(let i=0;i<10;i++){
            Axios.get(`${API_ALL_MOVIE}`+`${i+1}`)
            .then((result)=>{
                result.data.results.forEach((val)=>{
                    
                    // console.log("get:",val.genre_ids[0])
                    // console.log("clicked:",this.state.searchGenreHandler)

                    //cek dulu sesuai genre ga?
                    if(val.genre_ids[0]==this.state.searchGenreHandler){
                        array.push(val)
                        // console.log("array:",array)
                    }
                })
                // console.log(array.length) //ada
                this.setState({movieList:array})
            })
            .catch((err)=>{
                console.log("Error allmovie:", err)
            })   

        }
    }

    fetchMovieByName = () => {
        let array = []
        for(let i=0;i<300;i++){
            Axios.get(`${API_ALL_MOVIE}`+`${i+1}`)
            .then((result)=>{
                result.data.results.forEach((val)=>{
                    const nameLow = val.title.toLowerCase()
                    const keyLow = this.state.searchMovieName.toLocaleLowerCase()

                    // console.log("get:",nameLow)
                    // console.log("search:",keyLow)

                    //cek dulu include ga?
                    if(nameLow.includes(keyLow)){
                        array.push(val)
                        // console.log("array:",array)
                    }
                })
                // console.log(array.length) //ada
                this.setState({movieName:array})
            })
            .catch((err)=>{
                console.log("Error allmovie:", err)
            })   

        }
    }

    searchHandler = () => {
        this.setState({searchToggle:true})
        this.fetchMovieByName()
    }

    searcGenrehHandler = () => {
        this.setState({searchToggle:false})
    }

    genreClickHandler = (genre) => {
        // console.log("genreID:",genre.id,", genreName:",genre.name)
        this.setState({searchGenreHandler:genre.id})
        this.fetchMovieByGenre()
    }

    componentDidMount(){
        this.fetchGenre(),
        this.fetchMovieByGenre()
    }

    renderGenre = (item) => {
        // return console.log(item.item.name)
        return(
            <View style={{display:'flex',flexDirection:'column'}}>
                <View
                    style={{
                        height: windowHeight/5,
                        width: windowWidth/4,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {
                        item.item.id==this.state.searchGenreHandler?
                        <TouchableOpacity style={{borderRadius:5,backgroundColor:"rgba(235, 235, 235, 1)",padding:5}} onPress={()=>this.genreClickHandler(item.item)} >
                            <CustomText bold >{item.item.name}</CustomText>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>this.genreClickHandler(item.item)} >
                            <CustomText bold color="#fff">{item.item.name}</CustomText>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        )
    }

    //cek movie list, mana yg sesuai genre yg lagi diklik
    renderList = (item) => {
        return(
            <View style={{display:'flex',flexDirection:'column'}}>
                <View
                    style={{
                        height: windowHeight/3.5,
                        width: windowWidth/3,
                        justifyContent: "flex-start",
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
            <ScrollView style={{backgroundColor:"#010a12"}}>
                <View style={{marginTop:10}}>

                    <View style={{alignItems:'center'}}>
                        <H1 color="#ccc77c" >Discover Movie</H1>
                        <View style={{display:'flex',flexDirection: 'row', alignItems:'center'}}>
                            <DismissKeyboard>
                                <View>
                                    <KeyboardAvoidingView>
                                        <TextInput 
                                            style={{...style.textInput, marginHorizontal:5}}
                                            placeholder="Find Movie"
                                            onChangeText={text => this.setState({searchMovieName: text})}
                                            defaultValue=""
                                        />
                                    </KeyboardAvoidingView>
                                </View>
                            </DismissKeyboard>
                            <TouchableOpacity onPress={()=> this.searchHandler()}>
                                <Ionicons name="search" size={30} color="#fff" style={{marginHorizontal:5}} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        this.state.searchToggle===false?
                        <View>
                            <FlatList 
                                // style={{flex:1}}
                                data={this.state.genre}
                                renderItem={item => this.renderGenre(item)}
                                pagingEnabled
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />

                            <FlatList 
                                // style={{flex:1}}
                                data={this.state.movieList}
                                numColumns={3}
                                renderItem={item => this.renderList(item)}
                                pagingEnabled
                                // showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        :
                        <>
                        <View style={{marginTop:20,marginHorizontal:20}}>
                            <TouchableOpacity style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}} onPress={()=>this.searcGenrehHandler()}>
                                <H4 color="#fff">or search by genre</H4>
                                <Ionicons style={{marginLeft:5}} name="chevron-forward-circle-outline" size={20} color="#fff"  />
                            </TouchableOpacity>
                        </View>

                        {
                            this.state.movieName.length ? 
                            <>
                                <View style={{marginTop:20,marginHorizontal:20}}>
                                    <H4 color="#fff">Showing {this.state.movieName.length} result(s)</H4>
                                </View>

                                <FlatList 
                                    // style={{flex:1}}
                                    style={{marginTop:10}}
                                    data={this.state.movieName}
                                    numColumns={3}
                                    renderItem={item => this.renderList(item)}
                                    pagingEnabled
                                    // showsHorizontalScrollIndicator={false}
                                />
                            </>
                            :
                            <>
                                <View style={{marginTop:20,marginHorizontal:20}}>
                                    <H4 color="#fff">Showing {this.state.movieName.length} result(s)</H4>
                                </View>

                                <View style={{marginTop:30,marginHorizontal:20,alignItems:'center'}}>
                                    <H4 center color="#fff">Sorry, there are no movie in our database that matches with keyword <H4 bold underline color="#ccc77c">{this.state.searchMovieName}</H4>.</H4>
                                </View>
                            </>

                        }



                        </>
                    }


    
                </View>
    
            </ScrollView>
        )

    }

}

export default Discover

const style = StyleSheet.create({
    textInput: {
        borderRadius:4,
        backgroundColor: "lightgrey",
        height:40,
        width:Dimensions.get('window').width*0.8
    },
})