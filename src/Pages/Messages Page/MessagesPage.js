import React,{useState,useEffect} from 'react';
import { FlatList,View,Text } from 'react-native';
import styles from './MessagesPage.style';
import FloatingButton from '../../Components/Floating Button';
import SearchUsersModal from '../../Components/Modals/Search Users For Chat Modal/SearchUsersModal';
import { useIsFocused } from '@react-navigation/native';
import UserCard from '../../Components/Cards/User Card';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../Utils/parseContentData';
import firestore from '@react-native-firebase/firestore';
const MessagesPage=()=>{
    const [searchUsersForChatModalVisible,setSearchUsersForChatModalVisible]=useState(false);
    const isFocused = useIsFocused();
    const currUser=auth().currentUser;
    useEffect(()=>{
        if(isFocused==false){
            setSearchUsersForChatModalVisible(false);
        }

        
      

       
    },[isFocused]);
    function handleSearchUsersForChatModalVisible(){
        setSearchUsersForChatModalVisible(!searchUsersForChatModalVisible);
    }
   
    return(
        <View style={styles.container}>
           
         
           
            
            <FloatingButton onPress={handleSearchUsersForChatModalVisible} iconName='chat-plus'></FloatingButton>
            <SearchUsersModal visible={searchUsersForChatModalVisible} onClose={handleSearchUsersForChatModalVisible}></SearchUsersModal>
        </View>
    )
}
export default MessagesPage;