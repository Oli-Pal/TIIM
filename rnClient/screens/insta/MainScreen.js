import React from 'react';
import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


const MainScreen = (props) => {


    return (
        <View style={styles.screen}>
            <Text>Main Screen HERE!</Text>
        </View>
    );
}
export const screenOptions = (navData) => {
    return {
      headerTitle: 'MainScreen',
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

export default MainScreen;