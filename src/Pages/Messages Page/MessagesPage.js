import React,{useState,useEffect} from 'react';
import { FlatList,View} from 'react-native';
import styles from './MessagesPage.style';
import FloatingButton from '../../Components/Floating Button';
import SearchUsersModal from '../../Components/Modals/Search Users For Chat Modal/SearchUsersModal';
import { useIsFocused } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../Utils/parseContentData';
import ChatUserCard from '../../Components/Cards/Chat User Card/ChatUserCard';

const MessagesPage=()=>{
    const [searchUsersForChatModalVisible,setSearchUsersForChatModalVisible]=useState(false);
    const isFocused = useIsFocused();
    const currUser=auth().currentUser;
    const [chatUsersID,setChatUsersID]=useState([]);
    useEffect(()=>{
        if(isFocused==false){
            setSearchUsersForChatModalVisible(false);
        }

       database().ref(`users/${currUser.uid}/chats/`).on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                const parsedData=parseContentData(data);
                console.log(parsedData);
                setChatUsersID(parsedData);
            }
          });
      

       
    },[isFocused]);
    function handleSearchUsersForChatModalVisible(){
        setSearchUsersForChatModalVisible(!searchUsersForChatModalVisible);
    }
    const renderChatData=({item})=><ChatUserCard user={item}></ChatUserCard>
    return(
        <View style={styles.container}>
           
         
           
            
            <FlatList
            data={chatUsersID}
            renderItem={renderChatData}>

            </FlatList>
            <FloatingButton onPress={handleSearchUsersForChatModalVisible} iconName='chat-plus'></FloatingButton>
            <SearchUsersModal visible={searchUsersForChatModalVisible} onClose={handleSearchUsersForChatModalVisible}></SearchUsersModal>
        </View>
    )
}
export default MessagesPage;