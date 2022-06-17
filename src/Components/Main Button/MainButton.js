import React from 'react';
import {Text,TouchableOpacity,ActivityIndicator} from 'react-native';
import Colors from '../../Styles/Colors';
import styles from './MainButton.style';
const MainButton=({buttonPlaceHolder,onPress,buttonStyle,isLoading=false})=>{
    let activityIndicatorColor;
    if(buttonStyle==="primary"){
        activityIndicatorColor="white";
    }
    else{
        activityIndicatorColor=Colors.defaultColor;
    }
    return(
        <TouchableOpacity style={styles[buttonStyle].buttonContainer} onPress={onPress}>
            {isLoading ? <ActivityIndicator color={activityIndicatorColor} style={styles[buttonStyle].activityIndicatorStyle}></ActivityIndicator> : <Text style={styles[buttonStyle].buttonText}>{buttonPlaceHolder}</Text>}
        </TouchableOpacity>
    )
}
export default MainButton;