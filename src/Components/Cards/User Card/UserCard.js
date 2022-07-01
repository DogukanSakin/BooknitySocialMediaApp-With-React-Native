import React,{useEffect,useState} from 'react';
import { Text,View,TouchableOpacity,Image,TouchableWithoutFeedback } from 'react-native';
import styles from './UserCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
const UserCard=({user})=>{
    const navigation = useNavigation();
    const [userProfilePhotoURL,setUserProfilePhotoURL]=useState(null);
    useEffect(()=>{
        if(user.profilePhotoImageURL!=""){
            storage()
          .ref('/' + user.profilePhotoImageURL) //name in storage in firebase console
          .getDownloadURL()
          .then((url) => {
            setUserProfilePhotoURL(url);
          })
          .catch((e) => console.log('Errors while downloading => ', e));
        }


        


    },[]);
 
    return(
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("Profile",{userID:user.id})}>
                    {userProfilePhotoURL? <View style={styles.imageInnerContainer}><Image source={{uri:userProfilePhotoURL}} style={styles.profilePhotoContainer}></Image></View> : <Icon name='account-question' size={25} style={{flex:1}}></Icon>}
                </TouchableWithoutFeedback>
                <Text style={styles.userNameText}>{user.userName}</Text>
                {user.readingBookName ? <Text style={styles.bookNameText}>{user.readingBookName}</Text> : null}
                
            </View>
            <TouchableOpacity style={styles.sendMessageButtonContainer} onPress={()=>navigation.navigate("Chat",{targetUser:user,targetUserID:user.id})}><Text style={styles.sendMessageButtonText}>Send Message</Text></TouchableOpacity>
        </View>
    )
}
export default UserCard;
