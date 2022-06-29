import React from 'react';
import { Text,View,TouchableWithoutFeedback,Image} from 'react-native';
import styles from './ChatPage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import Colors from '../../Styles/Colors';
import { useNavigation } from '@react-navigation/native';
const ChatPage=({route})=>{
    const currUser=auth().currentUser;
    const {targetUser}=route.params;
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=> navigation.navigate("Messages",{closeSearchUserModalVisible:true})}>
                <View style={styles.backChatsContainer}>
                    <Icon name='arrow-u-left-top-bold' size={30} color={Colors.defaultColor}></Icon>
                    <Text style={styles.backChatText}>Back chats</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.profileInfoInnerContanier}>
                {targetUser.profilePhotoImageURL!="" ? <Image source={{uri: targetUser.profilePhotoURL}} style={null}></Image> : <Icon name='account-question' size={25}></Icon>}
                <Text style={styles.userNameText}>{targetUser.userName}</Text>
            </View>
            <View style={styles.horizontalLine}/>
        </View>
    )
}
export default ChatPage;