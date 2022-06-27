import React,{useEffect,useState} from 'react';
import {View,FlatList } from 'react-native';
import Modal from 'react-native-modal';
import styles from './SearchUsersModal.style';
import SearchInput from '../../Inputs/SearchInput';
import UserCard from '../../Cards/User Card';
import database from '@react-native-firebase/database';
import parseContentData from '../../../Utils/parseContentData';
const SearchUsersModal=({visible,onClose})=>{
    const [userList,setUserList]=useState([]);
    const [searchedUserList,setSearchedUserList]=useState([]);
    useEffect(()=>{
            database().ref('users/').on('value', snapshot => {
            const data=snapshot.val();
            if(data!=null){
                const parsedData=parseContentData(data);
                setUserList(parsedData);
            }
        
          });
    },[]);
    function handleSearchUser(name){
       if(name==""){
        setSearchedUserList([]);
       }
       else{
        const result=userList.filter(user=>{
            name=name.toLowerCase();
            const currentUserName=user.userName.toLowerCase();
            return currentUserName.indexOf(name) > -1;

        });
        setSearchedUserList(result);
        
       }
    }
    const renderUser=({item})=><UserCard user={item}></UserCard>;
    return(
        
        <Modal isVisible={visible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer}>
            <View style={styles.container}>
                <SearchInput inputPlaceHolder='Search users for chat...' onType={handleSearchUser}></SearchInput>
                <FlatList
                data={searchedUserList}
                renderItem={renderUser}></FlatList>
            </View>
        </Modal>
    )
}
export default SearchUsersModal;