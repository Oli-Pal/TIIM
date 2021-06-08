import React, {useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';

import * as authActions from '../store/actions/auth';

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                dispatch(authActions.setDidTryAL());
                return;
            }
           
            const transformedData = JSON.parse(userData);
            const {token, id} = transformedData;

            if (!token || !id ){
                dispatch(authActions.setDidTryAL());
                return;
            }
            
            dispatch(authActions.authenticate(id, token));
        };
        
        tryLogin();
    }, [dispatch])
  return <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
  </View>;
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
