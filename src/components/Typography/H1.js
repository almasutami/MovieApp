import React from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    h1: {
        fontSize: 36,
    },
})

const H1 = ({children, bold, italic, boldItalic, color="black", size=styles.h1,underline}) => {
    return (
        <Text style={{
            ...styles.h1,
            fontFamily: bold ? "Poppins-ExtraBold" : 
                        (italic ? "Poppins-Italic" :
                        (boldItalic ? "Poppins-ExtraBoldItalic" :
                        "Poppins-Regular")),
            color,
            size,
            textDecorationLine: underline? 'underline' : null,
        }}>
            {children}
        </Text>
    )
}

export default H1;