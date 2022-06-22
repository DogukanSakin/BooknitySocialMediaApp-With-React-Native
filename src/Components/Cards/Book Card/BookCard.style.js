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
    horizontalLine:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        padding:5,
        opacity:0.2,
        marginBottom:10
    },
    bookInfoContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    bookInfoText:{
        fontFamily:Fonts.defaultFontFamily,
        flex:1,
        textAlign:'center'
       
    },
    buttonsContainer:{
        flexDirection:'row'
    },
  
    addFavButtonStyle:{
        backgroundColor:Colors.defaultColor,
        padding:10,
        borderRadius:20,
        margin:5,
        flex:1,
       
    },
    readingButtonStyle:{
        backgroundColor:Colors.defaultColor,
        padding:10,
        borderRadius:20,
        margin:5,
        flex:1
    },
    buttonText:{
        fontFamily:Fonts.defaultFontFamily,
        color:'white',
        textAlign:'center'
    },
    bookNameText:{
        fontFamily:Fonts.defaultBannerFontFamily,
        textAlign:'center',
        margin:10,
       
    }

})
