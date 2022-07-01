import React,{useEffect,useState} from 'react';
import { Text,View,Image,TouchableWithoutFeedback } from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
import styles from './ChatUserCard.style';
import { useNavigation } from '@react-navigation/native';
const ChatUserCard=({user})=>{
    const [userInfo,setUserInfo]=useState([]);
    const [profilePhotoURL,setProfilePhotoURL]=useState(null);
    const navigation = useNavigation();
    useEffect(()=>{
        database().ref(`users/${user.id}`).on('value', snapshot => {
            const data=snapshot.val();
         
            if(data!=null){
                setUserInfo(data);
                if(data.profilePhotoImageURL!=""){
                    storage()
                    .ref('/' + data.profilePhotoImageURL) //name in storage in firebase console
                    .getDownloadURL()
                    .then((url) => {
                        setProfilePhotoURL(url);
                    })
                    .catch((e) => console.log('Errors while downloading => ', e));
                }
            }
          });
    },[]);
    return(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate("Chat",{targetUser:userInfo,targetUserID:user.id})}>
        <View style={styles.container}>
        {profilePhotoURL ? <Image source={{uri:profilePhotoURL }} style={styles.profilePhoto}></Image> : <Icon name='account-question' size={25}></Icon>}
            <Text style={styles.userNameText}>{userInfo.userName}</Text>
        </View>
        
        </TouchableWithoutFeedback>
    )
}
export default ChatUserCard;