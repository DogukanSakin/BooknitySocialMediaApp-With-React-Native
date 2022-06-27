import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    profileInfoContainer:{
        alignItems:'center',
        
        padding:25
    },
    profilePhotoContainer:{
        backgroundColor:Colors.defaultGreyBackgroundColor,
        height:100,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    },
    userNameText:{
        fontFamily:Fonts.defaultFontFamily,
        padding:10,
        fontSize:20
    },
    addPhotoButtonContainer:{
        backgroundColor:Colors.defaultColor,
        borderRadius:50,
        position: "absolute", 
        bottom: 0, 
        right: 0,
        height:25,
        width:25,
        justifyContent:'center',
        alignItems:'center'
    },
    bookNameText:{
        color:Colors.defaultColor,
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15

    }
});