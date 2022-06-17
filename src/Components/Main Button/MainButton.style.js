import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
const baseButtonStyle=StyleSheet.create({
    buttonTextBaseStyle:{
        fontFamily:Fonts.defaultFontFamily,
        fontSize:22,
        margin:15,
        flex:1,
        textAlign:'center',
    },
    buttonContainerBaseStyle:{
        borderRadius:60,
        alignItems:'center',
        flexDirection:'row',
        marginVertical:10
        
        
    }
})

export default {
    primary: StyleSheet.create({
        ...baseButtonStyle,
        buttonContainer:{
            ...baseButtonStyle.buttonContainerBaseStyle,
            backgroundColor:Colors.defaultColor,
         
            
        },
        buttonText:{
            ...baseButtonStyle.buttonTextBaseStyle,
            color:'white'
        },
        activityIndicatorStyle:{
            ...baseButtonStyle.buttonTextBaseStyle,
          
        }

    }),
    secondary: StyleSheet.create({
        ...baseButtonStyle,
        buttonContainer:{
            ...baseButtonStyle.buttonContainerBaseStyle,
            borderColor:Colors.defaultColor,
            borderWidth:1,

        },
        buttonText:{
            ...baseButtonStyle.buttonTextBaseStyle,
            color:Colors.defaultColor
        },
        activityIndicatorStyle:{
            ...baseButtonStyle.buttonTextBaseStyle,
        }

    })
}