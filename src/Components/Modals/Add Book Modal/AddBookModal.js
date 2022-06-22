import React from 'react';
import { Text,View,TextInput } from 'react-native';
import Modal from "react-native-modal";
import MainButton from '../../Main Button';
import styles from './AddBookModal.style';
import { Formik } from 'formik';
const initialFormValues={
    bookName:'',
    bookAuthor:''
}
const AddBookModal=({visible,onClose,onSend,loadingStatus})=>{
    function handleAddBook(content){
        onSend(content);   
    }
    return(
        <Modal isVisible={visible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer} >
            <View style={styles.container}>
                <Text style={styles.title}>Add a book</Text>
                <Formik initialValues={initialFormValues} onSubmit={handleAddBook}>
                {({values,handleChange,handleSubmit})=>
                 <>
                    <TextInput value={values.bookName} onChangeText={handleChange('bookName')}  placeholder='Book name' style={styles.inputStyle} ></TextInput>
                    <TextInput value={values.bookAuthor} onChangeText={handleChange('bookAuthor')} placeholder='Author' style={styles.inputStyle}></TextInput>
                    <MainButton isLoading={loadingStatus} buttonPlaceHolder="Add the book" buttonStyle="primary" onPress={handleSubmit}></MainButton>
                 </>
                }
                </Formik>
                
            </View>
            
        </Modal>
    )
}
export default AddBookModal;