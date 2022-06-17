import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        backgroundColor:Colors.defaultGreyBackgroundColor,
        padding:5,
        margin:5,
        borderRadius:10,
        marginTop:10,
        marginBottom:10
    },
    profilePhotoContainer:{
        height:50,
        width:50,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center', 
    },
    horizontalLine:{
        borderBottomWidth:0.3,
        borderBottomColor:'black',
        padding:5,
        flexDirection:'row',
        flex:1,
     
       
    },
    profileInfoContainer:{
        
       flexDirection:'row',
       
       
    },
    userNameText:{
        flex:1,
        top:15,
        fontSize:13,
        fontFamily:Fonts.defaultFontFamily
    },
    postTimeText:{
        top:15,
        fontSize:13,
        fontFamily:Fonts.defaultFontFamily
    },
    contentContainer:{
        marginLeft:50,
        marginTop:10,
    
     
    },
    contentText:{
        fontSize:13,
        fontFamily:Fonts.defaultFontFamily,
        marginBottom:25,
        flex:1
    },
    imageContentContainer:{
        height:200,
        padding:10,
        margin:5,
        borderRadius:10,
        marginTop:25,
        marginBottom:25,
        bottom:25
       

    },
    postLikeInfoContainer:{
        position: "absolute", 
        bottom: 0, 
        alignSelf: "flex-end",
        paddingRight:10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeNumberText:{
        paddingLeft:5,
        fontFamily:Fonts.defaultFontFamily,
        fontSize:13

    }
})