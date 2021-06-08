import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import * as Font from 'expo-font';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/users';
import followedReducer from './store/reducers/followed';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  followed: followedReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.log('Great APP')}
      />
    );
  }
  return (
    <Provider store={store}>
    <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
