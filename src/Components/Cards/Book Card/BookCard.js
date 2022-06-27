import React from 'react';
import { Text,View,TouchableOpacity,ActivityIndicator } from 'react-native';
import styles from './BookCard.style';
const BookCard =({book,onReadingThisBook,onAddFavThisBook,readingBookLoadingStatus,addFavLoadingStatus})=>{
    function handleReadingThisBook(bookName){
        onReadingThisBook(bookName);
    }
    function handleAddFavThisBook(bookName,id){
        onAddFavThisBook(bookName,id);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.bookNameText}>{book.name}</Text>
            <View style={styles.bookInfoContainer}>
                <Text style={styles.bookInfoText}>{book.author}</Text> 
            </View>
            
            <View style={styles.horizontalLine}/>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.readingButtonStyle} onPress={()=>handleReadingThisBook(book.name)}>
                    {readingBookLoadingStatus ? <ActivityIndicator color='white' size={15}></ActivityIndicator> : <Text style={styles.buttonText}>I’m reading this book</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.addFavButtonStyle} onPress={()=>handleAddFavThisBook(book.name,book.id)}>
                    {addFavLoadingStatus? <ActivityIndicator color='white' size={15}></ActivityIndicator> : <Text style={styles.buttonText}>Add favorites</Text>}
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default BookCard;