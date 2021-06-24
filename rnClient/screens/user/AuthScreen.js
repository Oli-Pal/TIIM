import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';


import Card from '../../components/Card';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]; // jezeli conajmniej jeden form jest nieprawdziwy to formIsValid wypluje false
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      confirmEmail: '',
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      city: '',
      confirmPassword: '',
      birthDate: '',
    },
    inputValidities: {
      email: false,
      confirmEmail: false,
      userName: false,
      firstName: false,
      lastName: false,
      password: false,
      city: false,
      confirmPassword: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error){
        Alert.alert('An error Occured!', error, [{text: 'Ok'}]);
    }
}, [error]);

  const authHandler = async () => {
    let action;
    if (isRegister) {
      action = authActions.register(
        formState.inputValues.email,
        formState.inputValues.confirmEmail,
        formState.inputValues.userName,
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.password,
        formState.inputValues.city,
        formState.inputValues.confirmPassword,
        formState.inputValues.birthDate
      );
    } else {
      action = authActions.login(formState.inputValues.userName, formState.inputValues.password);
    }
    setError(null);
    setIsLoading(true);
    try {
    await dispatch(action);
      
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }

  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#405de6', '#5851db', '#833ab4', '#c13584', '#e1306c', '#fd1d1d']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            {isRegister ? (
              <Input
                id="email"
                label="E-Mail"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="Enter valid username"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            ) : (
              <Text></Text>
            )}

            {isRegister ? (
              <Input
                id="confirmEmail"
                label="Confirm Email"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="Enter valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            ) : (
              <Text></Text>
            )}
            <Input
              id="userName"
              label="Username"
              keyboardType="default"
              required
              username
              autoCapitalize="none"
              errorText="Enter valid username"
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            {isRegister ? (
              <Input
                id="firstName"
                label="FirstName"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="Enter valid username"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            ) : (
              <Text></Text>
            )}
            {isRegister ? (
              <Input
                id="lastName"
                label="LastName"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="Enter valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            ) : (
              <Text></Text>
            )}

            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              minLength={5}
              secureTextEntry
              autoCapitalize="none"
              errorText="Enter valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isRegister ? (
              <Input
                id="city"
                label="City"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="Enter valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            ) : (
              <Text></Text>
            )}
            {isRegister ? (
              <Input
                id="confirmPassword"
                label="Confirm Password"
                keyboardType="default"
                required
                minLength={5}
                secureTextEntry
                autoCapitalize="none"
                errorText="Enter valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            ) : (
              <Text></Text>
            )}
            {isRegister ? (
              <Input
                id="birthDate"
                label="Birth Date"
                keyboardType="default"
                autoCapitalize="none"
                errorText="Enter valid password"
                onInputChange={inputChangeHandler}
                initialValue="2001-06-01T17:59:07.955Z"
              />
            ) : (
              <Text></Text>
            )}

            {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button title={isRegister ? 'Register' : 'Login'} color={Colors.primary} onPress={authHandler} />}
            <Button
              title={`Switch to ${isRegister ? 'Login' : 'Register'}`}
              color={Colors.accent}
              onPress={() => {
                setIsRegister((prevState) => !prevState);
              }}
            />
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Authentication',
    headerStyle: {
      backgroundColor: '#C13584',
    },
    headerTintColor: 'white',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '85%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
