import React from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './FavoritedBookCard.style';
const FavoritedBookCard=()=>{
    return(
        <View style={styles.container}>
            <Icon name='heart' size={20}></Icon>
            <Text style={styles.bookNameText}>bookName</Text>
            <TouchableOpacity style={styles.buttonStyle}><Text style={styles.buttonPlaceholderTextStyle}>Add favorites</Text></TouchableOpacity>
           
        </View>
    )
}
export default FavoritedBookCard;