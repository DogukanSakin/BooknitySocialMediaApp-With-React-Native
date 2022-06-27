import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        padding:10,
        marginTop:10,
        marginBottom:10,
        backgroundColor:Colors.defaultGreyBackgroundColor,
        borderRadius:10,
    },
    userInfoContainer:{
        flexDirection:'row',
        alignItems: 'center',
    },
    userNameText:{
        fontFamily:Fonts.defaultFontFamily,
        marginLeft:10,
        flex:1,
        fontSize:15
    },
    bookNameText:{
        fontFamily:Fonts.defaultFontFamily,
        color:Colors.defaultColor,
        fontSize:15
    },
    sendMessageButtonContainer:{
        backgroundColor:Colors.defaultColor,
        padding:10,
        borderRadius:50,
        marginTop:15,
        justifyContent:'center',
        alignItems: 'center',
    },
    sendMessageButtonText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15,
        color:'white'
    },
    profilePhotoContainer:{
        height:25,
        width:25,
        borderRadius:50,
        resizeMode:'contain',
      
    },
    imageInnerContainer:{
        flex:1
    }

})