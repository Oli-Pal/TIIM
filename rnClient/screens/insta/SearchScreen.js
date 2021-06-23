import React, { useReducer, useCallback, useState, useEffect } from 'react';

import {
    FlatList,
    Platform,
    View,
    Button,
    StyleSheet,
    Text,
    ActivityIndicator,
    TextInput,
    RefreshControlBase
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';
import SearchCard from '../../components/SearchCard';



const SearchScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [text, onChangeTexts] = useState("");
  
    const [error, setError] = useState();
    const users = useSelector((state) => state.users.loadedUsers);
    const dispatch = useDispatch();

  
    const loadUsers = useCallback(async () => {
      setError(null);
      setIsRefreshing(true);
      try {
        await dispatch(usersActions.searchUsers(text)); //this will wait for promise httprequest
    
      } catch (err) {
        setError(err.message);
      }
     setIsRefreshing(false);
    }, [dispatch, setIsRefreshing , setError]);

    useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', loadUsers); 
      return () => {
       unsubscribe(); 
      };
    }, [loadUsers]);
  

    useEffect(() => {
      setIsLoading(true);
      loadUsers().then(() => {
        setIsLoading(false);
      });
    }, [dispatch]);



    const selectItemHandler = (id, username) => {
      props.navigation.navigate('UserDetails', {
        id: id,
        userName: username,
      });
    };

   
  

    return (
        <View style={styles.screen}>
          <View style={styles.inputContainer}>
      <TextInput
      placeholder="Search for user"
        style={styles.input}
        value={text}
        onChangeText={onChangeTexts}
        
      />
      <Button  title="Search" style={styles.buttonStyle} onPress={() => {loadUsers}} />
      </View>
 
      <FlatList 
        onRefresh={loadUsers}
        refreshing={isRefreshing}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
         
         <SearchCard 
         mainPhoto={{uri: itemData.item.mainPhotoUrl}}
         name={itemData.item.userName}
         city={itemData.item.city}
         firstname={itemData.item.firstName}
         surname={itemData.item.lastName}
         onUserPress={() => { selectItemHandler(itemData.item.id, itemData.item.username )}}

         />
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
    buttonStyle: {
      paddingLeft: 10
    },
    searching: {
      margin: 10,
        flexDirection: 'column'
    },
    inputContainer: {
      marginTop: 10 ,
      flexDirection: 'row',
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
});

export default SearchScreen;