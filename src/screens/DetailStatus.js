import 'react-native-gesture-handler';
import React from 'react'
import { View, Image, FlatList , Dimensions, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'

import { H1,H2,H3,H4,CustomText } from "../components/Typography"
import Ionicons from 'react-native-vector-icons/Ionicons'

import Axios from 'axios'

const API_POSTER = "http://image.tmdb.org/t/p/w154/"
const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

class DetailStatus extends React.Component {

    renderList = (item) => {
        return(
            <View style={{display:'flex',flexDirection:'column'}}>
                <View
                    style={{
                        height: windowHeight/3.5,
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
        const rootParams = this.props.route.params

        return(
            <ScrollView style={{height:windowHeight*0.9, backgroundColor:"#010a12"}}>
                <ScrollView style={{marginVertical:10}}>
                    <View style={{alignSelf:'center'}}>
                        <H2 color="#fff" bold>{rootParams.stat}</H2>
                    </View>
                    <FlatList 
                        style={{flex:1}}
                        data={rootParams.data}
                        numColumns={3}
                        renderItem={item => this.renderList(item)}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>



            </ScrollView>
        )
    }

    

}

export default DetailStatus
