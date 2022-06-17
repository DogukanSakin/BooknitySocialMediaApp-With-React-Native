import React,{useState,useEffect} from 'react';
import { Text,View,TextInput,Image,Keyboard } from 'react-native';
import styles from './CreatePostModal.style';
import MainButton from '../../Main Button'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import { launchImageLibrary} from 'react-native-image-picker';

const CreatePostModal=({visible,onClose,onSend,loadingStatus})=>{
    const [pickerResponse, setPickerResponse] = useState(null);
   
    const [text,setText]=useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [inputError,setInputError]=useState(false);
    function handleSendPost(text,imageURL){
      setInputError(false);
      if(!text.trim() && imageURL===null){
        setInputError(true);
      }
      else{
        onSend(text,imageURL);
        setPickerResponse(null);
      
        setText('');  
      }
            
    }
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
        }
        
      );
      return () => {
        setPickerResponse(null);
        
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
      
    }, []);
    function handleSelectImage(){
        var options = {
            title: 'Select Image',
            allowsEditing: true,
            quality:0.9,
            noData: true,
            maxWidth:1200,
            maxHeight:1200,
            mediaType: "photo",
            customButtons: [
              { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                cameraRoll: false
            },
          };

          launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {

                const previewFileName=response.assets[0].uri;
                setPickerResponse(previewFileName);
               
              
            }
          });
    }
    return(
    
            <Modal isVisible={visible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer}>
                <View style={styles.container}>
                <View style={styles.createPostModalTitleContainer}>
                        <Text style={styles.titleText}>Create a post</Text>
                        { pickerResponse ? <Text style={styles.photoSelectedStatusText}>A photo selected.</Text>  : <Text style={styles.photoSelectedStatusText}>Not selected.</Text>}
                        <Icon name='folder-multiple-image' size={25} color={Colors.defaultColor} onPress={handleSelectImage}></Icon>
                    </View>
                    <TextInput placeholder="What's happening?"  onChangeText={setText} style={inputError? styles.inputErrorStyle : styles.inputStyle} multiline={true}></TextInput>
                    
                    <MainButton isLoading={loadingStatus} buttonPlaceHolder="Send the post" buttonStyle="primary" onPress={()=>handleSendPost(text,pickerResponse)}></MainButton>
                    
                    {pickerResponse&& !isKeyboardVisible ? <Image source={{uri: pickerResponse}} style={styles.selectedContentImageStyle}></Image>:<Text></Text>}
                </View>
            </Modal>
           
    )
}

export default CreatePostModal;