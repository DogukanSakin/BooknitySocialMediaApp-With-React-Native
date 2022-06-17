import React,{useState} from 'react';
import { Text,View } from 'react-native';
import styles from './RegisterPage.style';
import Logo from '../../Components/Logo';
import InputBox from '../../Components/InputBox';
import MainButton from '../../Components/Main Button';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import firebaseAuthErrorMessageParser from '../../Utils/firebaseAuthErrorMessageParser';
import Fonts from '../../Styles/Fonts';
const initialFormValues={
    userMail:'',
    userPassword:'',
    userRePassword:'',
}
const RegisterPage=({navigation})=>{
    const [loading,setLoading]=useState(false);
    async function handleRegister(formValues){
        if(formValues.userPassword!==formValues.userRePassword){
            showMessage({
                message: "The entered passwords do not match",
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
            });
        }
        else{
            try {
                setLoading(true);
                await auth().createUserWithEmailAndPassword(formValues.userMail,formValues.userPassword);
                setLoading(false);
                showMessage({
                    message: "The user has been successfully created.",
                    type: "success",
                    titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
                });
                navigation.navigate("Login");
                
            } 
            catch (error) {
                showMessage({
                    message: firebaseAuthErrorMessageParser(error.code),
                    type: "danger",
                    titleStyle:{fontFamily:Fonts.defaultBannerFontFamily},
                });
                setLoading(false);
            }

        }
        
    }
    return(
        <View style={styles.container}>
            <Logo/>
            <Text style={styles.registerWelcomeText}>Are you ready to join us?</Text>
            <Formik initialValues={initialFormValues} onSubmit={handleRegister}>
                {({values,handleChange,handleSubmit})=>
                    <>
                        <InputBox onType={handleChange('userMail')} inputValue={values.userMail} placeholder="E-mail" iconName="email"></InputBox>
                        <InputBox onType={handleChange('userPassword')} inputValue={values.userPassword} placeholder="Password" iconName="lock" isPassword={true}></InputBox>
                        <InputBox onType={handleChange('userRePassword')} inputValue={values.userRePassword} placeholder="Re-password" iconName="lock" isPassword={true}></InputBox>
                        <MainButton buttonPlaceHolder="Sign up free" buttonStyle="primary" onPress={handleSubmit} isLoading={loading}></MainButton>
                    </>
                }
                
            </Formik>
            <Text style={styles.loginText}>Do you have an account? <Text style={styles.loginTextInnerStyle} onPress={()=>navigation.navigate("Login")}>Login.</Text></Text>
        </View>
    )
}
export default RegisterPage;