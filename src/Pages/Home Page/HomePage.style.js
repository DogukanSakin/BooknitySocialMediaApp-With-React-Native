import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'white'
    },
    profileContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    profilePhotoContainer:{
        backgroundColor:Colors.defaultGreyBackgroundColor,
        height:50,
        width:50,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    profileCardTextContainer:{
        padding:5,
        flex:1
    },
    profileInfoText:{
        fontSize:15,
        fontFamily:Fonts.defaultFontFamily,
    },
    profileInfoInnerText:{
        color:Colors.defaultColor
    },
    horizontalLine:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        padding:5,
        opacity:0.2
    },
    logoutIconStyle:{
        color:Colors.defaultColor,
        
    },
    logoutIconContainer:{
        backgroundColor:Colors.defaultGreyBackgroundColor,
        height:50,
        width:50,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    }
   
    
})