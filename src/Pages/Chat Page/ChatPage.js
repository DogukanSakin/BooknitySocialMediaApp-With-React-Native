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
    const {targetUser}=route.params;
    const navigation = useNavigation();
    useEffect(() => {
        database().ref(`messages/${currUser.uid}/${targetUser.id}/`).on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                const parsedData=parseMessageData(data);
                setMessages(parsedData);   
            }
    
          });    
    }, []);
   async function handleSendMessage(message){
        try {
            const messageData={
                messageContent:message,
                sender:currUser.uid,
                date:(new Date()).toISOString()
            }
            setMessageText('');
            database().ref(`messages/${currUser.uid}/${targetUser.id}/`).push(messageData);  
            database().ref(`messages/${targetUser.id}/${currUser.uid}/`).push(messageData);  
            database().ref(`chats/${currUser.uid}/${targetUser.id}/`).set({lastMessage:message});  
            await database().ref(`chats/${targetUser.id}/${currUser.uid}/`).set({lastMessage:message}); 
                
            
            
           
        } catch (error) {
            console.log(error);
            showMessage({
                message: "Opps! There is an error...",
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
              });
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
            <TouchableWithoutFeedback onPress={()=>navigation.navigate("Profile",{userID:targetUser.id})}>
                <View style={styles.profileInfoInnerContanier}>
                    {targetUser.profilePhotoImageURL!="" ? <Image source={{uri: targetUser.profilePhotoURL}} style={null}></Image> : <Icon name='account-question' size={25}></Icon>}
                <Text style={styles.userNameText}>{targetUser.userName}</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.horizontalLine}/>
            <FlatList data={messages} renderItem={renderMessages}></FlatList>
            <View style={styles.messageInputContainer}>
            <TextInput value={messageText} placeholder='Messages...' style={styles.messageInputStyle} placeholderTextColor='black' multiline={true} onChangeText={(text)=>{setMessageText(text)}}></TextInput>
            <Icon name='send-circle' size={40} color={Colors.defaultColor} onPress={()=>{handleSendMessage(messageText)}}></Icon>
            </View>

        </View>
        
    )
}
export default ChatPage;