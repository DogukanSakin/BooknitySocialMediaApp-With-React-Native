import React from 'react';
import { View,Text,Image } from 'react-native';
import styles from './Logo.style';
const Logo=()=>{
    return(
    <View style={styles.container}>
        <Image source={require('../../../assets/images/logo.png')}></Image>
        <Text style={styles.logoTitleText}>Book<Text style={styles.logoTitleInnerText}>nity!</Text></Text>
        <Text style={styles.logoSubtitleText}>community for your books!</Text>
    </View>
    )

    
}
export default Logo;