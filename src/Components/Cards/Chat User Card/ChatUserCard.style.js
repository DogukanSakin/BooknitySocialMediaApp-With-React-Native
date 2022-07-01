import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        backgroundColor:Colors.defaultGreyBackgroundColor,
        flex:1,
        margin:10,
        borderRadius:20
    },
    userNameText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:20,
        marginLeft:10,
        flex:1,
        textAlign:'center'

    },
    profilePhoto:{
        height:25,
        width:25,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'

    }
})