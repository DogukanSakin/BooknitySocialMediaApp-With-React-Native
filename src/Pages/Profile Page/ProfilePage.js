import React,{useEffect,useState} from 'react';
import { Text,View,Image,TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import styles from './ProfilePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FavoritedBookCard from '../../Components/Cards/Favorited Book Card';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { launchImageLibrary} from 'react-native-image-picker';
const user=auth().currentUser;
const ProfilePage=({route})=>{
    const {userID}=route.params;
    const [profileInfo,setProfileInfo]=useState([]);
    useEffect(()=>{
        database().ref(`users/${userID}/`).on('value', snapshot => {
            const userData=snapshot.val();
            if(userData!=null){
                setProfileInfo(userData);
            
            }
          
        });
  
      
    },[]);
  
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
                    database().ref(`users/${userID}/profilePhotoImageURL/`).set(response.assets[0].uri);
                  // You can also display the image using data:
                  // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                  
                }
              });
             
        }
        
    }
    return(
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                <TouchableWithoutFeedback onPress={handleUploadProfilePhoto}>
                <View style={styles.profilePhotoContainer}>
                    
                    {profileInfo.profilePhotoImageURL ? <Image source={{uri: profileInfo.profilePhotoImageURL}} style={styles.profilePhotoContainer}></Image> : <Icon name='account-question' size={50}></Icon>}
                    {user.uid==userID ?  <View style={styles.addPhotoButtonContainer}><Icon name='plus' size={15} color='white'></Icon></View> : null }
                </View>
                </TouchableWithoutFeedback>
                <Text style={styles.userNameText}>{profileInfo.userName}</Text>
                { profileInfo.readingBookName!="" ? <Text style={styles.bookNameText}>{profileInfo.readingBookName}</Text> : <Text style={styles.bookNameText}>{profileInfo.userName} isn't reading a book yet!</Text> }
 
            </View>
            <FavoritedBookCard></FavoritedBookCard>
        </View>

    )
}
export default ProfilePage;