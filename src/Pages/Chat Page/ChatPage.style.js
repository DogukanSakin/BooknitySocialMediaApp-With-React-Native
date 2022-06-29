import { StyleSheet } from 'react-native';
import Fonts from '../../Styles/Fonts';
import Colors from '../../Styles/Colors';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:10
    },
    backChatsContainer:{
        flexDirection:'row',
        alignItems: 'center',
    },
    backChatText:{
        fontFamily:Fonts.defaultFontFamily,
        marginLeft:5,
        fontSize:25
    },
    profileInfoInnerContanier:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    userNameText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:20,
        marginLeft:5
       
    },
    horizontalLine:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        padding:5,
        opacity:0.2,
        marginBottom:10
    },
    messageInputStyle:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15,
        backgroundColor:Colors.defaultGreyBackgroundColor,
        borderRadius:10,
        paddingLeft:15,
        flex:1,

    },
    messageInputContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center'
    }
})