import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Platform
  } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import CustomHeaderButton from '../../components/HeaderButton';

  import * as authActions from '../../store/actions/auth';
  

const AddPostScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Add POST Screen HERE!</Text>
        </View>
    );
}

export const screenOptions = (navData) => {
    const dispatch = useDispatch();

    return {
      headerTitle: 'AddPostScreen',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
             title="Logout"
             iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
             onPress={() => {
                dispatch(authActions.logout());
              }}
             />
              
        </HeaderButtons>
      ) ,
      headerStyle: {
        backgroundColor: '#C13584'
    },
        headerTintColor: 'white',
    };
  };


const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AddPostScreen;