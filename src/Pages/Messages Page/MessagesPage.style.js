import { StyleSheet,Dimensions } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
const deviceSize=Dimensions.get('window')
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        
    },
    userDontHaveChatDataText:{
        fontSize:20,
        fontFamily:Fonts.defaultFontFamily,
        color:Colors.defaultColor,
        textAlign:'center',
        marginTop:deviceSize.width/2
      
        
    }
    
})