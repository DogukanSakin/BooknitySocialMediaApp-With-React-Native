import { StyleSheet } from 'react-native';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        backgroundColor:'white'
      
    },
    welcomeText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:30,
        margin:20,
    },
  
})