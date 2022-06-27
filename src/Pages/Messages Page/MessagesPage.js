import React,{useState} from 'react';
import { Text,View } from 'react-native';
import styles from './MessagesPage.style';
import FloatingButton from '../../Components/Floating Button';
import SearchUsersModal from '../../Components/Modals/Search Users For Chat Modal/SearchUsersModal';

const MessagesPage=()=>{
    const [searchUsersForChatModalVisible,setSearchUsersForChatModalVisible]=useState(false);
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