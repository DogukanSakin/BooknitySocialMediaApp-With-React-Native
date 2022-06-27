import React,{useState,useEffect} from 'react';
import { Text,View,Image,TouchableWithoutFeedback } from 'react-native';
import styles from './PostCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDistance,parseISO} from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
const PostCard=({post,onLike})=>{
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState(null);
    const [userInfo,setUserInfo]=useState([]);
    const formattedDate=formatDistance(parseISO(post.date), new Date(), { addSuffix: true });
    const [userProfilePhoto,setUserProfilePhoto]=useState(null);
    useEffect(()=>{
    database().ref(`users/${post.creatorID}`).on('value', snapshot => {
    const userData=snapshot.val();  
    if(userData!=null){
        setUserInfo(userData);
        
    }  
  });

  if(post.postImage!=""){
   
     storage()
      .ref('/' + post.postImage) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
   
    
    
  }

  if(userInfo["profilePhotoImageURL"]!=""){
    
       storage()
      .ref('/' + userInfo["profilePhotoImageURL"]) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setUserProfilePhoto(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
    
   
  }

  


    
  
},[]);



    return(
        <TouchableWithoutFeedback onLongPress={onLike}>
        <View style={styles.container}>
                <View style={styles.profileInfoContainer}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Profile",{userID:post.creatorID})}>
                    <View style={styles.profilePhotoContainer}>
                        {userProfilePhoto?  <Image source={{uri:userProfilePhoto}} style={styles.profilePhotoContainer}></Image> : <Icon name='account-question' size={25}></Icon> }
                                     
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.horizontalLine}>
                        <Text style={styles.userNameText}>{post.userName}</Text>
                        <Text style={styles.postTimeText}>{formattedDate}</Text>
                    </View>   
                </View>
                <View style={styles.contentContainer}>
                    {post.postText ? <Text style={styles.contentText}>{post.postText}</Text> : null}
                    {imageUrl ? <Image source={{uri: imageUrl}} style={styles.imageContentContainer}></Image> : null} 
                </View>
                <View style={styles.postLikeInfoContainer}>
                    <Icon name='thumb-up' size={25} onPress={onLike}></Icon>
                    <Text style={styles.likeNumberText}>{post.likeNumber}</Text>
                </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
export default PostCard