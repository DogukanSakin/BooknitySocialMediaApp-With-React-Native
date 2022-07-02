import { StyleSheet,Dimensions } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
const deviceSize = Dimensions.get('window');
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:10
    },
    title:{
        fontFamily:Fonts.defaultFontFamily,
        textAlign:'center',
        fontSize:25
    },
    currentUserInnerContainer:{
        justifyContent: 'center',
        alignItems:'center',
        padding:10,
        flex: 1, 
        flexWrap: 'wrap'
    },  
    userNameText:{
        color:Colors.defaultColor,
        fontFamily:Fonts.defaultFontFamily,
        fontSize:20,
        marginTop:10,
        

    },
    imageInnerContainer:{
        backgroundColor:Colors.defaultGreyBackgroundColor,
        height:100,
        width:100,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:50
    },
    usersInnerContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        
    },
    logoStyle:{
        height:85,
        width:85,
        marginLeft:25,
        marginRight:25
    },
    anotherUserFavBooksTitleText:{
        fontFamily:Fonts.defaultFontFamily,
        textAlign:'center',
        fontSize:20
    },
    warningText:{
        fontSize:25,
        fontFamily:Fonts.defaultFontFamily,
        textAlign:'center',
        color:Colors.defaultColor
    },
    warningInnerContainer:{
        justifyContent: 'center',
        alignItems:'center',
        flex:1
    }
   
    
})