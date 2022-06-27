import React,{useState} from 'react';
import { Text,View } from 'react-native';
import Logo from '../../Components/Logo';
import styles from './LoginPage.style';
import InputBox from '../../Components/Inputs/InputBox';
import MainButton from '../../Components/Main Button';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import firebaseAuthErrorMessageParser from '../../Utils/firebaseAuthErrorMessageParser';
import Fonts from '../../Styles/Fonts';

const initialFormValues={
    userMail:'',
    userPassword:''
}
const LoginPage=({navigation})=>{
    const[loading,setLoading]=useState(false);
    async function handleLogin(formValues){
        try {
            setLoading(true);
            await auth().signInWithEmailAndPassword(formValues.userMail,formValues.userPassword);
            setLoading(false);
            
        } 
        catch (error) {
            setLoading(false);
            showMessage({
                message: firebaseAuthErrorMessageParser(error.code),
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
              });
        }
        
    }
    return(
        <View style={styles.container}>
            <Logo/>
            <Formik initialValues={initialFormValues} onSubmit={handleLogin}>
                {({values,handleChange,handleSubmit})=>
                    <>
                        <InputBox inputValue={values.userMail} onType={handleChange('userMail')}  placeholder="E-mail" iconName="email" ></InputBox>
                        <InputBox inputValue={values.userPassword} onType={handleChange('userPassword')}  placeholder="Password" iconName="lock" isPassword={true}></InputBox>
                        <MainButton buttonPlaceHolder="Login" buttonStyle="primary" onPress={handleSubmit} isLoading={loading}></MainButton>
                    </>
                }
                
            </Formik>
            <Text style={styles.dontHaveAccountText}>Don’t have an account? <Text style={styles.dontHaveAccountInnerText} onPress={()=>navigation.navigate("Register")}>Join us!</Text></Text>
        </View>
    )
}
export default LoginPage;