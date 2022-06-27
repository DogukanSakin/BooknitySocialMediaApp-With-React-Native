import React,{useEffect,useState} from 'react';
import { Text,View,Image,TouchableWithoutFeedback,FlatList } from 'react-native';
import styles from './ProfilePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FavoritedBookCard from '../../Components/Cards/Favorited Book Card';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import parseContentData from '../../Utils/parseContentData';
import { showMessage } from "react-native-flash-message";
import Fonts from '../../Styles/Fonts';
const ProfilePage=({route})=>{
    const {userID}=route.params;
    const user=auth().currentUser;
    const [profileInfo,setProfileInfo]=useState([]);
    const [profilePhotoURL,setProfilePhotoURL]=useState(null);
    const [userFavBooks,setUserFavBooks]=useState([]);

    useEffect(()=>{
      database().ref(`users/${userID}/`).on('value', snapshot => {
        const userData=snapshot.val();
        if(userData!=null){
            setProfileInfo(userData);
            setProfilePhotoURL(profileInfo["profilePhotoImageURL"])
            fetchProfilePhoto(profilePhotoURL);
        }
      
    });
  
      database().ref(`favBooks/${userID}/`).on('value', snapshot => {
        const data=snapshot.val();
        if(data!=null){
            const parsedData=parseContentData(data);
            setUserFavBooks(parsedData);
            console.log(parsedData)
        }
        else{
          setUserFavBooks([]);
        }
       
      });
    
    
   
    },[]);
    function handleAddFavBook(bookName,id){

      database().ref(`favBooks/${user.uid}/id`).set({bookName:bookName});
      showMessage({
       message: "The book  successfully added your favs.",
       type: "success",
       titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
     });
  }
  function handleRemoveFavBook(bookName,id){
    database().ref(`favBooks/${user.uid}/${id}`).remove();
  }
    function fetchProfilePhoto(profilePhoto){
      if(profilePhoto!=""){
     
        storage()
          .ref('/' +profilePhoto) //name in storage in firebase console
          .getDownloadURL()
          .then((url) => {
            setProfilePhotoURL(url);
          })
          .catch((e) => console.log('Errors while downloading => ', e));
        
      }
    }
    async function handleUploadProfilePhoto(){
        if(user.uid!=userID){
            return;
        }
        else if(user.uid==userID){
            var options = {
                title: 'Select Image',
                allowsEditing: true,
                quality:0.9,
                noData: true,
                maxWidth:1200,
                maxHeight:1200,
                mediaType: "photo",
                customButtons: [
                  { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
                ],
                storageOptions: {
                    skipBackup: true,
                    cameraRoll: false
                },
              };
    
              await launchImageLibrary(options, response => {
                console.log('Response = ', response);
    
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                  alert(response.customButton);
                } else {
                    const responseURI=response.assets[0].uri;
                    const imageName=responseURI.substring(responseURI.lastIndexOf('/')+1);
                    database().ref(`users/${userID}/profilePhotoImageURL/`).set(imageName);
                    
                    const task=storage().ref(imageName).putFile(responseURI);
                    task.on('state_changed', taskSnapshot => {
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });
                    async()=>{
                      await task;
                      fetchProfilePhoto(imageName);
                    }
                    
                  
                  
                }
              });
              
             
        }
        
    }
    const renderFavBook=({item})=><FavoritedBookCard favBook={item} onAddFavBook={handleAddFavBook} onRemoveFavBook={handleRemoveFavBook}></FavoritedBookCard>;
    return(
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                <TouchableWithoutFeedback onPress={handleUploadProfilePhoto}>
                <View style={styles.profilePhotoContainer}>
                    {profilePhotoURL? <Image source={{uri: profilePhotoURL}} style={styles.profilePhotoContainer}></Image> : <Icon name='account-question' size={50}></Icon>}
                    {user.uid==userID ?  <View style={styles.addPhotoButtonContainer}><Icon name='plus' size={15} color='white'></Icon></View> : null }
                </View>
                </TouchableWithoutFeedback>
                <Text style={styles.userNameText}>{profileInfo.userName}</Text>
                { profileInfo.readingBookName!="" ? <Text style={styles.bookNameText}>{profileInfo.readingBookName}</Text> : <Text style={styles.bookNameText}>{profileInfo.userName} isn't reading a book yet!</Text> }
            </View>
            <FlatList
            data={userFavBooks}
            renderItem={renderFavBook}
            numColumns={2}
           
            ></FlatList>
            
        </View>
        

    )
}
export default ProfilePage;