import React,{useState,useEffect} from 'react';
import { Text,View,Image,FlatList } from 'react-native';
import styles from './ReaderMatch.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButton from '../../Components/Main Button';
import FloatingButton from '../../Components/Floating Button'
import parseContentData from '../../Utils/parseContentData';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import FavoritedBookCard from '../../Components/Cards/Favorited Book Card';
import { showMessage } from "react-native-flash-message";
import Fonts from '../../Styles/Fonts';
import { useNavigation } from '@react-navigation/native';
const ReaderMatch=()=>{
    const navigation = useNavigation();
    const currUser=auth().currentUser;
    const [allUsersData,setAllUsersData]=useState([]);
    const [currUserData,setCurrUserData]=useState([]);
    const [currUserProfilePhotoURL,setCurrUserProfileURL]=useState(null);
    const [foundedUsers,setFoundedUsers]=useState([]);
    const [foundedUserProfilePhotoURL,setFounedUserProfilePhotoURL]=useState(null);
    const [foundedUsersFavBooks,setFoundedUsersFavBooks]=useState([]);
    const [isUserFounded,setIsUserFounded]=useState(false);
    useEffect(()=>{
        fetchAllUsersData();
        fetchCurrUserData();   
        getUserForMatch();
    },[]);
    async function fetchAllUsersData(){
        await database().ref('users/').on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                const parsedData=parseContentData(data);
                setAllUsersData(parsedData);
            }
          });
    }
    async function fetchCurrUserData(){
        await database().ref(`users/${currUser.uid}/`).on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                setCurrUserData(data);
            }
          });
          if(currUserData.profilePhotoImageURL!=""){
            storage()
            .ref('/' + currUserData.profilePhotoImageURL) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
                setCurrUserProfileURL(url);
            })
            .catch((e) => console.log('Errors while downloading => ', e));
          }
    }
   function getUserForMatch(){
        setFoundedUsers([]);
        setIsUserFounded(false);
        setFoundedUsersFavBooks([]);
        setFounedUserProfilePhotoURL(null);
        const result= allUsersData.filter(users=>{
            currUserData.readingBookName=currUserData.readingBookName.toLowerCase();
            const currentBookName=users.readingBookName.toLowerCase();
            return currentBookName.indexOf(currUserData.readingBookName) > -1 && users.id!=currUser.uid ;
          
        })
        const randomNumber=Math.floor(Math.random() * result.length);
        if(result[randomNumber]!=undefined){
            setFoundedUsers(result[randomNumber]);
            setIsUserFounded(true);
            if(foundedUsers.profilePhotoImageURL!=""){
                storage()
                .ref('/' + foundedUsers.profilePhotoImageURL) //name in storage in firebase console
                .getDownloadURL()
                .then((url) => {
                    setFounedUserProfilePhotoURL(url);
                })
                .catch((e) => console.log('Errors while downloading => ', e));
            
            }


            database().ref(`favBooks/${foundedUsers.id}/`).on('value', snapshot => {
                const data=snapshot.val();
                if(data!=null){
                    const parsedData=parseContentData(data);
                    setFoundedUsersFavBooks(parsedData);
               
                }
                else{
                    setFoundedUsersFavBooks([]);
                }
               
              });

        }
        
    }
    function handleAddFavBook(bookName,id){

        database().ref(`favBooks/${currUser.uid}/${id}`).set({bookName:bookName});
        showMessage({
         message: "The book  successfully added your favs.",
         type: "success",
         titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
       });
    }
    function handleRemoveFavBook(bookName,id){
      database().ref(`favBooks/${currUser.uid}/${id}`).remove();
    }
    const renderFavBook=({item})=><FavoritedBookCard favBook={item} onAddFavBook={handleAddFavBook} onRemoveFavBook={handleRemoveFavBook}></FavoritedBookCard>;
    return(
      <View  style={styles.container}>
        {currUserData.readingBookName!="" && isUserFounded==true ?  
        <View style={styles.container}>
            <Text style={styles.title}>You are currently reading {currUser.readingBookName} together with:</Text>
            <View style={styles.usersInnerContainer}>
            <View style={styles.currentUserInnerContainer}>
                <View style={styles.imageInnerContainer}>
                    {currUserProfilePhotoURL ? <Image source={{uri:currUserProfilePhotoURL}} style={styles.imageInnerContainer}></Image> : <Icon name='account-question' size={35}></Icon>} 
                </View>
             <Text style={styles.userNameText}>{currUserData.userName}</Text>   
            </View>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logoStyle}></Image>
            <View style={styles.currentUserInnerContainer}>
                <View style={styles.imageInnerContainer}>
                <View style={styles.imageInnerContainer}>
                    {foundedUserProfilePhotoURL ? <Image source={{uri:foundedUserProfilePhotoURL}} style={styles.imageInnerContainer}></Image> : <Icon name='account-question' size={35}></Icon>} 
                </View>
                </View>
             <Text style={styles.userNameText}>{foundedUsers.userName}</Text>   
            </View>
        </View>
        <MainButton buttonPlaceHolder="Look for someone new" buttonStyle="primary" onPress={getUserForMatch}></MainButton>
        {foundedUsersFavBooks ? 
        (
        <View>
        <Text style={styles.anotherUserFavBooksTitleText}>{foundedUsers.userName}'s favorite books:</Text>
        <FlatList data={foundedUsersFavBooks}
        renderItem={renderFavBook}
        numColumns={2}></FlatList>
        </View>
        )
        : 
        null 
        }
        
        <FloatingButton iconName='message-plus' onPress={()=>navigation.navigate("MessagesPageStack",{screen:"Chat",params:{targetUser:foundedUsers,targetUserID:foundedUsers.id}})}></FloatingButton>
        </View>
       
        : 
        <View style={styles.warningInnerContainer}>
            <Text style={styles.warningText}>You're not reading a book or there hasn't been a match. If you are reading a book, please add it to your profile using the book search page for a match. </Text>
        </View>
        }
      </View>
        
    )
}

export default ReaderMatch;