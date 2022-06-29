import React from 'react';
import { Text,View } from 'react-native';
import styles from './MessageCard.style';
import auth from '@react-native-firebase/auth';
const MessageCard=({message})=>{
    const currUser=auth().currentUser;
    let messageCardStyle;
    if(currUser.uid==message.sender){
        messageCardStyle="currentUserMessages";
    }
    else{
        messageCardStyle="anotherUserMessages";
    }
    return(
        <View style={styles[messageCardStyle].container}>
            <Text style={styles[messageCardStyle].contentText}>{message.messageContent}</Text>
        </View>
    )
}
export default MessageCard;