import React,{useState,useEffect} from 'react';
import { Text,View } from 'react-native';
import styles from './MessagesPage.style';
import FloatingButton from '../../Components/Floating Button';
import SearchUsersModal from '../../Components/Modals/Search Users For Chat Modal/SearchUsersModal';
import { useIsFocused } from '@react-navigation/native';
const MessagesPage=()=>{
    const [searchUsersForChatModalVisible,setSearchUsersForChatModalVisible]=useState(false);
    const isFocused = useIsFocused();
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