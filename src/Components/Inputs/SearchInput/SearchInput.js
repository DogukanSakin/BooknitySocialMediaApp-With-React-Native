import React from 'react';
import { View,TextInput } from 'react-native';
import styles from './SearchInput.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SearchInput=({onType,inputPlaceHolder})=>{
    return(
        <View style={styles.searchInputBoxStyle}>
            <Icon name='magnify' size={25}></Icon>
            <TextInput placeholder={inputPlaceHolder} style={styles.inputBox} onChangeText={onType}></TextInput>
        </View>
    )
}
export default SearchInput;