import { StyleSheet } from 'react-native';
import Fonts from '../../../Styles/Fonts';
import Colors from '../../../Styles/Colors';
export default StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:15,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    modalContainer:{
        justifyContent: 'flex-end',
        margin:0
    },
    title:{
        fontFamily:Fonts.defaultFontFamily,
        paddingBottom:10
    },
    inputStyle:{
        borderBottomWidth:0.8,
        fontFamily:Fonts.defaultFontFamily,
        borderColor:Colors.defaultColor,
        color:Colors.defaultColor,
        marginBottom:10
 
    }
})