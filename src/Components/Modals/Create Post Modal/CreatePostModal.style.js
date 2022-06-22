import { StyleSheet,Dimensions } from 'react-native';
import Fonts from '../../../Styles/Fonts';
const deviceSize=Dimensions.get('window');
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
  
   
    inputStyle:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15  
    },
    inputErrorStyle:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15 ,
        borderBottomWidth:0.5,
        borderColor:'red',
    },
    titleText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15,
        marginLeft:5,
        flex:1
    },
    createPostModalTitleContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    selectedContentImageStyle:{
        height:deviceSize.height/2,
        width:deviceSize.width,
        resizeMode:'contain',
       justifyContent:'center',
       alignItems:'center',
     
    },
    photoSelectedStatusText:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:15,
        marginRight:10,
       
    },
   
})