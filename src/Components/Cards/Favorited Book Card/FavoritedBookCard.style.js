import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        padding:15,
        margin:15,
        backgroundColor:Colors.defaultGreyBackgroundColor,
        height:150,
        width:150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
    
    },
    bookNameText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15,
        padding:10,
  

    },
    buttonStyle:{
        backgroundColor:Colors.defaultColor,
        padding:10,
        borderRadius:20,
        width:125,
      
    },
    buttonPlaceholderTextStyle:{
        color:'white',
        fontFamily:Fonts.defaultFontFamily,
        textAlign:'center'
    }
    
})