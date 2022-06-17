import React,{useEffect,useState} from 'react';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomePage from './Pages/Welcome Page';
import LoginPage from './Pages/Login Page';
import RegisterPage from './Pages/Register Page';
import FlashMessage from "react-native-flash-message";
import HomePage from './Pages/Home Page';
import auth from '@react-native-firebase/auth';
import ProfilePage from './Pages/Profile Page';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBookPage from './Pages/Search Book Page';
import MessagesPage from './Pages/Messages Page';
import ChatPage from './Pages/Chat Page';
import ReaderMatchPage from './Pages/Reader Match Page';
import { View,Text,StyleSheet } from 'react-native';
import Colors from './Styles/Colors';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Router=()=>{
    const [userSession,setUserSession]=useState();
    useEffect(()=>{
        auth().onAuthStateChanged((user)=>{
            setUserSession(!!user);
        
        });
    },[]);
    const WelcomePagesStack=()=>{
  
        return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Welcome" component={WelcomePage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                <Stack.Screen name="Login" component={LoginPage} />
            </Stack.Navigator>
        )
        
    }
    const LoginnedUserHomeStack=()=>{
        return(
            <Stack.Navigator screenOptions={{headerShown:false}} >
                <Stack.Screen name="Home" component={HomePage}/>
                <Stack.Screen name="Profile" component={ProfilePage}/>
                
            </Stack.Navigator>
        )
    }
    const LoginnedUserChatStack=({ navigation, route })=>{
      React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
  
        if (routeName === "Chat"){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);
        return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Messages" component={MessagesPage}/>
                <Stack.Screen name="Chat" component={ChatPage} />
            </Stack.Navigator>
        )
    }
    return(
        <NavigationContainer>
            { !userSession ?
            (
                <Stack.Navigator  screenOptions={{headerShown:false}}>
                    <Stack.Screen name="WelcomePagesStack" component={WelcomePagesStack}></Stack.Screen>
                </Stack.Navigator>
            )
            :
            (
                <Tab.Navigator screenOptions={{headerShown:false, tabBarShowLabel:false}}>
                    <Tab.Screen name="LoginnedUserStack" component={LoginnedUserHomeStack} options={{
                       
                         tabBarIcon: ({ focused }) => {
        
                            return (
                              <View>
                                <Icons name='home' size={25} color={focused? Colors.defaultColor : Colors.tabBarDefaultInactiveColor}></Icons>
                              </View>
                            );
                          },
                    }}></Tab.Screen>
                    <Tab.Screen name="SearchBookPage" component={SearchBookPage} options={{
                         tabBarIcon: ({ focused }) => {
        
                            return (
                              <View>
                                <Icons name='book-search' size={25} color={focused? Colors.defaultColor : Colors.tabBarDefaultInactiveColor}></Icons>
                              </View>
                            );
                          },
                    }}></Tab.Screen>
                    
                    <Tab.Screen name="MessagesPageStack" component={LoginnedUserChatStack} options={{
                         tabBarIcon: ({ focused }) => {
        
                            return (
                              <View>
                                <Icons name='message-text' size={25} color={focused? Colors.defaultColor : Colors.tabBarDefaultInactiveColor}></Icons>
                              </View>
                            );
                          },
                    }}></Tab.Screen>
                    <Tab.Screen name="ReaderMatch" component={ReaderMatchPage} options={{
                         tabBarIcon: ({ focused }) => {
        
                            return (
                              <View>
                                <Icons name='heart' size={25} color={focused? Colors.defaultColor : Colors.tabBarDefaultInactiveColor}></Icons>
                              </View>
                            );
                          },
                    }}></Tab.Screen>
                </Tab.Navigator>
            )
            }
           
            <FlashMessage position="top" /> 
        </NavigationContainer>
    )

}

export default Router;