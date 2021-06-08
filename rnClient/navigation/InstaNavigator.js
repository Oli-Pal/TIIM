import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { Platform, Text, SafeAreaView, Button, View } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import MainScreen, {screenOptions as mainScreenOptions} from '../screens/insta/MainScreen';
import SearchScreen, {screenOptions as searchScreenOptions} from '../screens/insta/SearchScreen';
import AddPostScreen, {screenOptions as addPostScreenOptions} from '../screens/user/AddPostScreen';
import EditProfileScreen, {screenOptions as editProfileScreenOptions} from '../screens/user/EditProfileScreen';
import AuthScreen,  {screenOptions as authScreenOptions} from '../screens/user/AuthScreen';



const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: '#C13584' }} >
            <Tab.Screen name = "Home" component={MainStackScreen} 
            options={{
            tabBarIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
              size={24}
              color={'white'}
            />
          ),
        }} />
            <Tab.Screen name = "Search" component={SearchStackScreen} 
            options={{
            tabBarIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
              size={24}
              color={'white'}
            />
          ),
        }}  />
            <Tab.Screen name = "Add" component={AddPostStackScreen} 
            options={{
            tabBarIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}
              size={24}
              color={'white'}
            />
          ),
        }}  />
            <Tab.Screen name = "Edit" component={EditProfileStackScreen}
            options={{
                tabBarIcon: (props) => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-body' : 'ios-body'}
                  size={23}
                  color={'white'}
                />
              ),
            }}  />
        </Tab.Navigator>
    );
}

const MainStackNavigator = createStackNavigator();

const MainStackScreen = () => {
    return (
        <MainStackNavigator.Navigator >
            <MainStackNavigator.Screen name="Main" component={MainScreen} options={mainScreenOptions} />
        </MainStackNavigator.Navigator>
        
    );
}
const SearchStackNavigator = createStackNavigator();
const SearchStackScreen = () => {
    return (
        <SearchStackNavigator.Navigator>
            <SearchStackNavigator.Screen name="Search" component={SearchScreen} options={searchScreenOptions} />
        </SearchStackNavigator.Navigator>
        
    );
}

const AddPostStackNavigator = createStackNavigator();

const AddPostStackScreen = () => {
    return (
        <AddPostStackNavigator.Navigator>
            <AddPostStackNavigator.Screen name="AddPost" component={AddPostScreen} options={addPostScreenOptions} />
        </AddPostStackNavigator.Navigator>
        
    );
}

const EditProfileStackNavigator = createStackNavigator();

const EditProfileStackScreen = () => {
    return (
        <EditProfileStackNavigator.Navigator>
            <EditProfileStackNavigator.Screen name="EditProfile" component={EditProfileScreen} options={editProfileScreenOptions} />
        </EditProfileStackNavigator.Navigator>
        
    );
}



const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions}/>
    </AuthStackNavigator.Navigator>
  );
};


