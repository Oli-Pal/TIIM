import React from 'react';
import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';


const AddPostScreen = (props) => {


    return (
        <View style={styles.screen}>
            <Text>Add POST Screen HERE!</Text>
        </View>
    );
}

export const screenOptions = (navData) => {
    return {
      headerTitle: 'AddPostScreen',
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

export default AddPostScreen;