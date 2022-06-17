import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';

export default StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        padding:20,
        backgroundColor:'white'

    },
    registerWelcomeText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:25,
        padding:10,
    },
  
    loginText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:17,
        padding:10
    },
    loginTextInnerStyle:{
        color:Colors.defaultColor
    }
 
})