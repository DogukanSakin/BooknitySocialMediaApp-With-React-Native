import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
const messageCardBaseStyle=StyleSheet.create({
    container:{
        borderRadius:50,
        padding:10,
        alignSelf: 'flex-start',
        marginBottom:15
       
    },
    messageContentText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:17
    }
})
export default{
    currentUserMessages: StyleSheet.create({
        contentText:{
            ...messageCardBaseStyle.messageContentText, 
            color:'white'
        },
        container:{
            ...messageCardBaseStyle.container,
            backgroundColor:Colors.defaultColor,
            borderBottomLeftRadius:10
           
        }
    }),
    anotherUserMessages:StyleSheet.create({
        contentText:{
            ...messageCardBaseStyle.messageContentText, 
            textAlign:'right'
           
        },
        container:{
            ...messageCardBaseStyle.container,
            backgroundColor:Colors.defaultGreyBackgroundColor,
            borderBottomRightRadius:10,
            alignSelf: 'flex-end'
           
        }

    })
   
    
}
