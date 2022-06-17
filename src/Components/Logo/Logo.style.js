import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    logoTitleText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:30
    },
    logoTitleInnerText:{
        color:Colors.defaultColor,
    },
    logoSubtitleText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15
    }
})