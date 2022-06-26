import React,{useState,useEffect} from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './FavoritedBookCard.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const FavoritedBookCard=({favBook,onAddFavBook,onRemoveFavBook})=>{
    const user=auth().currentUser;
    const [isAlreadyAddedFav,setIsAlreadyAddedFav]=useState(false);

    useEffect(()=>{
        database().ref(`favBooks/${user.uid}/`)
            .orderByChild('bookName')
            .equalTo(favBook.bookName)
            .once('value')
            .then(snapshot => {
              if (snapshot.exists()) {
                setIsAlreadyAddedFav(true);
              } else {
                setIsAlreadyAddedFav(false);   
              }
          });
    },[]);
    function handleAddFavBook(bookName){
        onAddFavBook(bookName);
    }
    function handleRemoveFavBook(bookName){
        onRemoveFavBook(bookName);
    }
    return(
        <View style={styles.container}>
            <Icon name='heart' size={20}></Icon>
            <Text style={styles.bookNameText}>{favBook.bookName}</Text>
            {isAlreadyAddedFav? <TouchableOpacity style={styles.buttonStyle} onPress={()=>handleRemoveFavBook(favBook.bookName)}><Text style={styles.buttonPlaceholderTextStyle}>Remove Favorites</Text></TouchableOpacity> : <TouchableOpacity style={styles.buttonStyle} onPress={()=>handleAddFavBook(favBook.bookName)}><Text style={styles.buttonPlaceholderTextStyle}>Add favorites</Text></TouchableOpacity>}
            
           
        </View>
    )
}
export default FavoritedBookCard;