import React from 'react';
import { Text,View } from 'react-native';
import Logo from '../../Components/Logo';
import MainButton from '../../Components/Main Button/MainButton';
import styles from './WelcomePage.style';
const WelcomePage=({navigation})=>{
    function goToPage(pageName){
        navigation.navigate(pageName);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Logo/>
            
            <MainButton buttonPlaceHolder='Sign up free' onPress={()=>goToPage("Register")} buttonStyle='primary' ></MainButton>
            <MainButton buttonPlaceHolder='Login' onPress={()=>goToPage("Login")} buttonStyle='secondary'></MainButton>
            
        </View>
    )
}
export default WelcomePage;