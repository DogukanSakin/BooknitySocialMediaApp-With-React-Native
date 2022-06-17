import React,{useState,useEffect} from 'react';
import { Text,View,Image,TouchableWithoutFeedback } from 'react-native';
import styles from './PostCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDistance,parseISO} from 'date-fns';
import Colors from '../../../Styles/Colors';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
const PostCard=({post,onLike,likeStatus})=>{
    const navigation = useNavigation();
    const [userInfo,setUserInfo]=useState([]);
    const formattedDate=formatDistance(parseISO(post.date), new Date(), { addSuffix: true });
    useEffect(()=>{
    database().ref(`users/${post.creatorID}`).on('value', snapshot => {
    const userData=snapshot.val();  
    if(userData!=null){
        setUserInfo(userData);
    }  
  });
  
},[]);
    return(
        <TouchableWithoutFeedback onLongPress={onLike}>
        <View style={styles.container}>
                <View style={styles.profileInfoContainer}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Profile",{userID:post.creatorID})}>
                    <View style={styles.profilePhotoContainer}>
                        {userInfo.profilePhotoImageURL ?  <Image source={{uri:userInfo.profilePhotoImageURL}} style={styles.profilePhotoContainer}></Image> : <Icon name='account-question' size={25}></Icon> }
                                     
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.horizontalLine}>
                        <Text style={styles.userNameText}>{post.userName}</Text>
                        <Text style={styles.postTimeText}>{formattedDate}</Text>
                    </View>   
                </View>
                <View style={styles.contentContainer}>
                    {post.postText ? <Text style={styles.contentText}>{post.postText}</Text> : null}
                    {post.postImage ? <Image source={{uri: post.postImage}} style={styles.imageContentContainer}></Image> : null} 
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