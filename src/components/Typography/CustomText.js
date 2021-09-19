import React from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    h3: {
        fontSize: 12,
    },
})

const CustomText = ({children, bold, italic, boldItalic, color="black", size=styles.h3,underline}) => {
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
        }}>
            {children}
        </Text>
    )
}

export default CustomText;