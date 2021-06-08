import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator, AuthNavigator } from './InstaNavigator';
import StartupScreen from '../screens/StartupScreen';


const AppNavigator = (props) => {

  const isAuth = useSelector((state) => !!state.auth.token); // if we have token it will be true if not it will be false
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
     {isAuth && <TabNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
