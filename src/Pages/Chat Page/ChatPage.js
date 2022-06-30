import React,{useState,useEffect} from 'react';
import { Text,View,TouchableWithoutFeedback,Image,FlatList,TextInput} from 'react-native';
import styles from './ChatPage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import Colors from '../../Styles/Colors';
import { useNavigation } from '@react-navigation/native';
import MessageCard from '../../Components/Cards/Message Card';
import Fonts from '../../Styles/Fonts';
import { showMessage } from "react-native-flash-message";
import database from '@react-native-firebase/database';
import parseMessageData from '../../Utils/parseMessageData';
const ChatPage=({route})=>{
    const [messageText,setMessageText]=useState('');
    const [messages,setMessages]=useState([]);
    const currUser=auth().currentUser;
    const {targetUser,targetUserID}=route.params;
    const navigation = useNavigation();
    useEffect(() => {
        
    }, []);
   async function handleSendMessage(messageContent){
      const messageData={
        message:messageContent,
        
      }
       
    }
    const renderMessages=({item})=><MessageCard message={item}></MessageCard>
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=> navigation.navigate("Messages",{closeSearchUserModalVisible:true})}>
                <View style={styles.backChatsContainer}>
                    <Icon name='arrow-u-left-top-bold' size={30} color={Colors.defaultColor}></Icon>
                    <Text style={styles.backChatText}>Back chats</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate("Profile",{userID:targetUserID})}>
                <View style={styles.profileInfoInnerContanier}>
                    {targetUser.profilePhotoImageURL!="" ? <Image source={{uri: targetUser.profilePhotoURL}} style={null}></Image> : <Icon name='account-question' size={25}></Icon>}
                <Text style={styles.userNameText}>{targetUser.userName}</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.horizontalLine}/>
            <FlatList ></FlatList>
            <View style={styles.messageInputContainer}>
            <TextInput value={messageText} placeholder='Messages...' style={styles.messageInputStyle} placeholderTextColor='black' multiline={true} onChangeText={(text)=>{setMessageText(text)}}></TextInput>
            <Icon name='send-circle' size={40} color={Colors.defaultColor} onPress={()=>{handleSendMessage(messageText)}}></Icon>
            </View>

        </View>
        
    )
}
export default ChatPage;