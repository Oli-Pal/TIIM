import React from 'react';
import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';


const SearchScreen = (props) => {


    return (
        <View style={styles.screen}>
            <Text>Search Screen HERE!</Text>
        </View>
    );
}

export const screenOptions = (navData) => {
    return {
      headerTitle: 'SearchScreen',
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

export default SearchScreen;