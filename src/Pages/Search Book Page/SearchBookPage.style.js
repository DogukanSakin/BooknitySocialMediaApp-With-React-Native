import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:10
    },
    searchInputBoxStyle:{
        backgroundColor:Colors.defaultGreyBackgroundColor,
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        marginBottom:10,
    },
    inputBox:{
        flex:1,
        fontFamily:Fonts.defaultFontFamily
    }
})