import React, { useReducer, useCallback, useState, useEffect } from 'react';

import {
    FlatList,
    Platform,
    View,
    Button,
    StyleSheet,
    Text,
    ActivityIndicator,
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';


import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => {
//     if (action.type === FORM_INPUT_UPDATE) {
//       const updatedValues = {
//         ...state.inputValues,
//         [action.input]: action.value,
//       };
//       const updatedValidities = {
//         ...state.inputValidities,
//         [action.input]: action.isValid,
//       };
//       let updatedFormIsValid = true;
//       for (const key in updatedValidities) {
//         updatedFormIsValid = updatedFormIsValid && updatedValidities[key]; // jezeli conajmniej jeden form jest nieprawdziwy to formIsValid wypluje false
//       }
//       return {
//         formIsValid: updatedFormIsValid,
//         inputValidities: updatedValidities,
//         inputValues: updatedValues,
//       };
//     }
//     return state;
//   };
  



const SearchScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
  
    const [error, setError] = useState();
    const users = useSelector((state) => state.users.loadedUsers);
    const dispatch = useDispatch();

    // const [formState, dispatchFormState] = useReducer(formReducer, {
    //     inputValues: {
    //       search: ''
    //     },
    //     inputValidities: {
    //       search: false,
    //     },
    //     formIsValid: false,
    //   });
  
    const loadUsers = useCallback(async () => {
      setError(null);
      setIsRefreshing(true);
      try {
        await dispatch(usersActions.searchUsers()); //this will wait for promise httprequest
        // console.log(users);
      } catch (err) {
        setError(err.message);
      }
     setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);
  
    useEffect(() => {
  
      const unsubscribe = props.navigation.addListener('focus', loadUsers); 
  
      
      return () => {
       unsubscribe(); //executing to clear that subscription
      };
    }, [loadUsers]);
  
    //fire this  whenever this components loads
    useEffect(() => {
      setIsLoading(true);
      loadUsers().then(() => {
        setIsLoading(false);
      });
    }, [dispatch, loadUsers]);
  
   
  //   const searchHandler = async () => {
  //       let action;
      
  //         action = usersActions.searchUsers(formState.inputValues.search);
        
  //       setError(null);
  //       setIsLoading(true);
  //       try {
  //       await dispatch(action);
          
  //       } catch (error) {
  //         setError(error);
  //         setIsLoading(false);
  //       }
    
  //     };

    
  // const inputChangeHandler = useCallback(
  //   (inputIdentifier, inputValue, inputValidity) => {
  //     dispatchFormState({
  //       type: FORM_INPUT_UPDATE,
  //       value: inputValue,
  //       isValid: inputValidity,
  //       input: inputIdentifier,
  //     });
  //   },
  //   [dispatchFormState]
  // );
  
    return (
        <View style={styles.screen}>
            {/* <View style={styles.searching}> 
                <Input
                id="search"
                label="Search"
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="User with such name doesn't exist"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
        <Button title="Search" color={Colors.primary} onPress={searchHandler} />
              
              </View> */}
      <FlatList
        onRefresh={loadUsers}
        refreshing={isRefreshing}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
         <View>
             <Text>{itemData.item.userName}</Text>
         </View>
        )}
      />
        </View>

      
    );
};

export const screenOptions = (navData) => {
    return {
      headerTitle: 'SearchScreen',
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
    },
    searching: {
        flexDirection: 'column'
    }
});

export default SearchScreen;