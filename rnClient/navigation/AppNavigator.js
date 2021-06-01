import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { TabNavigator } from './InstaNavigator';

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
