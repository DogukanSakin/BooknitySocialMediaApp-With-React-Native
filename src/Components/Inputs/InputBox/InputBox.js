import React from 'react';
import {TextInput,View } from 'react-native';
import styles from './InputBox.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../../Styles/Colors';

const InputBox=({placeholder,iconName,isPassword,inputValue,onType})=>{
    return(
        <View style={styles.container}>
            <Icon name={iconName} size={25} color={Colors.defaultIconColor}></Icon>
            <TextInput onChangeText={onType} value={inputValue} placeholder={placeholder} style={styles.inputBoxStyle} secureTextEntry={isPassword}></TextInput>
        </View>
        
    )
}
export default InputBox