import React from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './BookCard.style';
const BookCard =({book})=>{
  
    return(
        <View style={styles.container}>
            <Text style={styles.bookNameText}>{book.name}</Text>
            <View style={styles.bookInfoContainer}>
                <Icon name='account-outline' size={20}></Icon>
                <Text style={styles.bookInfoText}>{book.reader}</Text>
                <Text style={styles.bookInfoText}>{book.author}</Text>
                <Text style={styles.bookInfoText}>{book.fav}</Text>
                <Icon name='heart' size={20}></Icon>
            </View>
            
            <View style={styles.horizontalLine}/>
            <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.readingButtonStyle}><Text style={styles.buttonText}>I’m reading this book</Text></TouchableOpacity>
                <TouchableOpacity style={styles.addFavButtonStyle}><Text style={styles.buttonText}>Add favorites</Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default BookCard;