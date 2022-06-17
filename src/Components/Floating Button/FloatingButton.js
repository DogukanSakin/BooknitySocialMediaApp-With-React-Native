import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './FloatingButton.style';
import Colors from '../../Styles/Colors'
const FloatingButton=({onPress})=>{
    return(
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Icon name='plus' size={30} color={Colors.defaultGreyBackgroundColor}></Icon>
        </TouchableOpacity>
    )
}
export default FloatingButton;