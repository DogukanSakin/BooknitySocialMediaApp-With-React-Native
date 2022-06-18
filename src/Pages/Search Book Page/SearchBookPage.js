import React from 'react';
import { Text,View,TextInput } from 'react-native';
import styles from './SearchBookPage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BookCard from '../../Components/Cards/Book Card';
const SearchBookPage=()=>{
    return(
        <View style={styles.container}>
            <View style={styles.searchInputBoxStyle}>
            <Icon name='magnify' size={25}></Icon>
            <TextInput placeholder='Search book...' style={styles.inputBox}></TextInput>
            </View>
            <BookCard></BookCard>
            <BookCard></BookCard>
        </View>
    )
}
export default SearchBookPage;