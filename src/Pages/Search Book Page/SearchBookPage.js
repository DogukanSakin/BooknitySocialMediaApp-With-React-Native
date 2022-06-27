import React,{useState,useEffect} from 'react';
import { View,TextInput,FlatList } from 'react-native';
import styles from './SearchBookPage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BookCard from '../../Components/Cards/Book Card';
import FloatingButton from '../../Components/Floating Button';
import AddBookModal from '../../Components/Modals/Add Book Modal';
import database from '@react-native-firebase/database';
import { showMessage } from "react-native-flash-message";
import Fonts from '../../Styles/Fonts';
import parseContentData from '../../Utils/parseContentData';
import auth from '@react-native-firebase/auth';
const SearchBookPage=()=>{
    const [addBookModalVisible,setAddBookModalVisible]=useState(false);
    const [addBookLoadingStatus,setAddBookLoadingStatus]=useState(false);
    const [bookList,setBookList]=useState([]);
    const [filteredBookList,setFilteredBookList]=useState([]);
    const [bookCardReadingBookChangeLoadingStatus,setBookCardReadingBookChangeLoadingStatus]=useState(false);
    const [bookCardAddFavBookLoadingStatus,setBookCardAddFavBookLoadingStatus]=useState(false);
    const user=auth().currentUser;
    useEffect(()=>{
        database().ref('books/').on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                const parsedData=parseContentData(data);
                setBookList(parsedData);
            }
          }); 
    },[]);
    async function handleAddFavThisBook(bookName,id){
        try {
            setBookCardAddFavBookLoadingStatus(true);
            await database().ref(`favBooks/${user.uid}/`)
            .orderByChild('bookName')
            .equalTo(bookName)
            .once('value')
            .then(snapshot => {
              if (snapshot.exists()) {
                showMessage({
                    message: "The book is already added to your favs.",
                    type: "info",
                    titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
                  });
                  setBookCardAddFavBookLoadingStatus(false);
              } else {
                database().ref(`favBooks/${user.uid}/${id}`).set({bookName:bookName});
                showMessage({
                 message: "The book  successfully added your favs.",
                 type: "success",
                 titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
               });
                setBookCardAddFavBookLoadingStatus(false);
                
              }
          });
        } catch (error) {
            showMessage({
                message: "Opps! There is an error...",
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
              });
            setBookCardAddFavBookLoadingStatus(false);
        }
    }
    async function handleReadingThisBook(bookName){
        try {
            setBookCardReadingBookChangeLoadingStatus(true);
            await database().ref(`users/${user.uid}/readingBookName/`).set(bookName);
            showMessage({
             message: "Your reading book has been successfully changed. ",
             type: "success",
             titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
           });
           setBookCardReadingBookChangeLoadingStatus(false);
        } catch (error) {
            showMessage({
                message: "Opps! There is an error...",
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
              });
              setBookCardReadingBookChangeLoadingStatus(false);
        }
       
    }
    function handleSearchBooks(searchedBookName){
        if(searchedBookName==""){
            setFilteredBookList([]);
        }
        else{
            const result= bookList.filter(book=>{
                searchedBookName=searchedBookName.toLowerCase();
                const currentBookName=book.name.toLowerCase();
                return currentBookName.indexOf(searchedBookName) > -1 ;
              
            })
            setFilteredBookList(result);
        }
      
    }
    function handleAddBookModalVisible(){
        setAddBookModalVisible(!addBookModalVisible);
    }
    async function handleAddBook(content){
        const book={
            name:content.bookName,
            author:content.bookAuthor,
          
        }
        try {
            setAddBookLoadingStatus(true);
            await database().ref('books/').push(book);  

            showMessage({
                message: "The book has been sent successfully.",
                type: "success",
                titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
              });
              setAddBookLoadingStatus(false);
              setAddBookModalVisible(false);
              
        } catch (error) {
            showMessage({
                message: "Opps! There is an error...",
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
              });
              console.log(error);
              setAddBookLoadingStatus(false);
              setAddBookModalVisible(false);
        }
    }
    const renderBookList=({item})=><BookCard book={item} onReadingThisBook={handleReadingThisBook} onAddFavThisBook={handleAddFavThisBook} readingBookLoadingStatus={bookCardReadingBookChangeLoadingStatus} addFavLoadingStatus={bookCardAddFavBookLoadingStatus}></BookCard>;
    return(
        <View style={styles.container}>
                <View style={styles.searchInputBoxStyle}>
                   <Icon name='magnify' size={25}></Icon>
                   <TextInput placeholder='Search book...' style={styles.inputBox} onChangeText={handleSearchBooks}></TextInput>
                </View>
               <FlatList
               data={filteredBookList}
               renderItem={renderBookList}></FlatList>
               <FloatingButton onPress={handleAddBookModalVisible}></FloatingButton>
               <AddBookModal loadingStatus={addBookLoadingStatus} visible={addBookModalVisible} onClose={handleAddBookModalVisible} onSend={handleAddBook}></AddBookModal>

        </View>
    )
}
export default SearchBookPage;