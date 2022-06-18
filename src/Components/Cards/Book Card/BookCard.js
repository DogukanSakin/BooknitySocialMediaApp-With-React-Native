import React from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './BookCard.style';
const BookCard =()=>{
    return(
        <View style={styles.container}>
            <View style={styles.bookInfoContainer}>
                
                <Icon name='account-outline' size={20}></Icon>
                <Text style={styles.bookInfoText}>readerNumber</Text>
                <Text style={styles.bookInfoText}>bookName</Text>
                <Text style={styles.bookInfoText}>favNumber</Text>
                <Icon name='heart' size={20}></Icon>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.readingButtonStyle}><Text style={styles.buttonText}>I’m reading this book</Text></TouchableOpacity>
                <View style={styles.buttonsInnerContainer}/>
                <TouchableOpacity style={styles.addFavButtonStyle}><Text style={styles.buttonText}>Add favorites</Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default BookCard;