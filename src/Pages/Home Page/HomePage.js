import React,{useState,useEffect} from 'react';
import { Text,View,TouchableWithoutFeedback,FlatList,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './HomePage.style';
import auth from '@react-native-firebase/auth';
import FloatingButton from '../../Components/Floating Button';
import PostCard from '../../Components/Cards/Post Card';
import database from '@react-native-firebase/database';
import CreatePostModal from '../../Components/Modals/Create Post Modal';
import { showMessage } from "react-native-flash-message";
import Fonts from '../../Styles/Fonts';
import parseContentData from '../../Utils/parseContentData';
const HomePage=({navigation})=>{
    const [sendPostLoadingStatus,setSendPostLoadingStatus]=useState(false);
    const user=auth().currentUser;
    const [createPostModalVisible,setCreatePostModalVisible]=useState(false);
    const [postsList,setPostList]=useState([]);
    const [userInfo,setUserInfo]=useState([]);
    useEffect(()=>{
            database().ref('posts/').on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                const parsedData=parseContentData(data);
                setPostList(parsedData);
            }
          });

          database().ref(`users/${user.uid}`).on('value', snapshot => {
            const userData=snapshot.val();
            if(userData==null){
               const userInfo={
                profilePhotoImageURL:'',
                readingBookName:'',
                userName:user.email.split('@')[0],

                }   
               database().ref(`users/${user.uid}/`).set(userInfo);
            }
            else{
                setUserInfo(userData);
            }
          });

          


         
          


       
          
         
    },[]);
    async function handleLikePost(post,postId){
       
        await database().ref(`posts/${postId}/`).update({likeNumber:post.likeNumber+1}).then(() => console.log('Data updated.'));
       
     }


    function handleCreatePostModalClose(){
        setCreatePostModalVisible(!createPostModalVisible)
    }
   
    async function handleSendPost(content,contentImageURL){
            try {
                setSendPostLoadingStatus(true);
                const post={
                    postText:content,
                    userName:user.email.split('@')[0],
                    date: (new Date()).toISOString(),
                    postImage: contentImageURL,
                    likeNumber:0,
                    creatorID: user.uid
                   
                 }
                  await database().ref('posts/').push(post);     
                  showMessage({
                    message: "Your post has been sent successfully.",
                    type: "success",
                    titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
                  });
                  setSendPostLoadingStatus(false);
                  setCreatePostModalVisible(false);
                  
                  
            } catch (error) {
                setSendPostLoadingStatus(false);
                showMessage({
                    message: "Opps! There is an error...",
                    type: "danger",
                    titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
                  });
            }
        
    }
    const renderPost=({item})=><PostCard post={item} onLike={()=>handleLikePost(item,item.id)} user={userInfo}></PostCard>;
    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profilePhotoContainer}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Profile",{userID:user.uid})}>
                        {userInfo.profilePhotoImageURL ? <Image source={{uri: userInfo.profilePhotoImageURL}} style={styles.profilePhotoContainer}></Image> : <Icon name='account-question' size={25}></Icon>}
                        
                    </TouchableWithoutFeedback>
                    
                </View>
                <View style={styles.profileCardTextContainer}>
                    <Text style={styles.profileInfoText}>Welcome <Text style={styles.profileInfoInnerText}>{user.email.split('@')[0]}!</Text></Text>
                    {userInfo.readingBookName!="" ? <Text style={styles.profileInfoText}>You are reading: <Text style={styles.profileInfoInnerText}>{userInfo.readingBookName}</Text></Text> : null}
                    
                </View>  
                <View style={styles.logoutIconContainer}>
                    <Icon name='logout' size={25} style={styles.logoutIconStyle} onPress={()=>auth().signOut()}></Icon>
                </View>  
                    
            </View>
            <View style={styles.horizontalLine}/>
            <FlatList renderItem={renderPost} data={postsList}></FlatList>
            <FloatingButton onPress={handleCreatePostModalClose} />
            <CreatePostModal loadingStatus={sendPostLoadingStatus} visible={createPostModalVisible} onClose={handleCreatePostModalClose} onSend={handleSendPost}></CreatePostModal>
           
           
        </View>
    )
}
export default HomePage;