import React from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    h3: {
        fontSize: 14,
    },
})

const H3 = ({children, bold, italic, boldItalic, color="black", size=styles.h3, underline, center, backgroundColor,width}) => {
    return (
        <Text style={{
            ...styles.h3,
            fontFamily: bold ? "Poppins-SemiBold" : 
                        (italic ? "Poppins-Italic" :
                        (boldItalic ? "Poppins-SemiBoldItalic" :
                        "Poppins-Regular")),
            color,
            size,
            textDecorationLine: underline? 'underline' : null,
            textAlign: center? 'center' : null,
            backgroundColor,
            width,
        }}>
            {children}
        </Text>
    )
}

export default H3