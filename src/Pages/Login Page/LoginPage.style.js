import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        padding:20,
        backgroundColor:'white'
    },
    dontHaveAccountText:{
        padding:10,
        fontFamily:Fonts.defaultFontFamily,
        fontSize:17
    },
    dontHaveAccountInnerText:{
        color:Colors.defaultColor
    }

});