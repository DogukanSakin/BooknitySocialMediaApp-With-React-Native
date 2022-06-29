import React,{useState,useEffect} from 'react';
import { FlatList,View,Text } from 'react-native';
import styles from './MessagesPage.style';
import FloatingButton from '../../Components/Floating Button';
import SearchUsersModal from '../../Components/Modals/Search Users For Chat Modal/SearchUsersModal';
import { useIsFocused } from '@react-navigation/native';
import UserCard from '../../Components/Cards/User Card';
import parseContentData from '../../Utils/parseContentData';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const MessagesPage=()=>{
    const [searchUsersForChatModalVisible,setSearchUsersForChatModalVisible]=useState(false);
    const isFocused = useIsFocused();
    const[userChatsData,setUserChatsData]=useState([]);
    const[isUserHaveChatData,setIsUserHaveChatData]=useState(true);
    const currUser=auth().currentUser;
    useEffect(()=>{
        if(isFocused==false){
            setSearchUsersForChatModalVisible(false);
        }

        database().ref(`chats/${currUser.uid}/`).on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                const parsedData=parseContentData(data);
                setUserChatsData(parsedData);
                setIsUserHaveChatData(true);
                console.log(parsedData);
            }
            else{
                setIsUserHaveChatData(false);
            }
          });
        

          

        

  

    },[isFocused]);
    function handleSearchUsersForChatModalVisible(){
        setSearchUsersForChatModalVisible(!searchUsersForChatModalVisible);
    }
    const renderChats=({item})=><UserCard user={item}></UserCard>
    return(
        <View style={styles.container}>
            {isUserHaveChatData ? 
            <FlatList
            data={null}>
            </FlatList> 
            : 
            <Text style={styles.userDontHaveChatDataText}>You should start a conversation!</Text>
            }
            
            <FloatingButton onPress={handleSearchUsersForChatModalVisible} iconName='chat-plus'></FloatingButton>
            <SearchUsersModal visible={searchUsersForChatModalVisible} onClose={handleSearchUsersForChatModalVisible}></SearchUsersModal>
        </View>
    )
}
export default MessagesPage;