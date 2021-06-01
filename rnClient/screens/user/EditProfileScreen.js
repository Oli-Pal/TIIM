import React from 'react';
import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';


const EditProfileScreen = (props) => {


    return (
        <View style={styles.screen}>
            <Text>Edit PROFILE Screen HERE!</Text>
        </View>
    );
}

export const screenOptions = (navData) => {
    return {
      headerTitle: 'EditProfileScreen',
      headerStyle: {
        backgroundColor: 'black'
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

export default EditProfileScreen;