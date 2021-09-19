import React from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    h2: {
        fontSize: 24,
    },
})

const H2 = ({children, bold, italic, boldItalic, color="black", size=styles.h2,underline}) => {
    return (
        <Text style={{
            ...styles.h2,
            fontFamily: bold ? "Poppins-Bold" : 
                        (italic ? "Poppins-Italic" :
                        (boldItalic ? "Poppins-BoldItalic" :
                        "Poppins-Regular")),
            color,
            size,
            textDecorationLine: underline? 'underline' : null,
        }}>
            {children}
        </Text>
    )
}

export default H2;