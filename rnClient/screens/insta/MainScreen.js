import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Platform, View, Button, StyleSheet, Text, ActivityIndicator, ScrollView, Image, LayoutAnimation, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import * as followedActions from '../../store/actions/followed';
import { Header, Icon, IconBar, Metadata } from '../../components/Item';

import { Ionicons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';

import * as authActions from '../../store/actions/auth';
import * as photoActions from '../../store/actions/photos';

const MainScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState();

  const followed = useSelector((state) => state.followed.userFollowed);
  const dispatch = useDispatch();

  const getFollowed = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    
    try {
      await dispatch(followedActions.fetchFollowed()); //this will wait for promise httprequest

    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
  
    const unsubscribe = props.navigation.addListener('focus', getFollowed); 

    
    return () => {
     unsubscribe(); //executing to clear that subscription
    };
  }, [getFollowed]);

  useEffect(() => {
    setIsLoading(true);
    getFollowed().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, getFollowed]);

  
  LayoutAnimation.easeInEaseOut();
  const [isLiked, setIsLiked] = useState();
  
  return (
    
    <View style={styles.screen}>
   
    
      <FlatList onRefresh={getFollowed} 
      data={followed} refreshing={isRefreshing} 
      keyExtractor={item => item.id}
      renderItem={(itemData) => (
          <View style={styles.container}>
            <Header image={{uri: itemData.item.userPhotoUrl}} name={itemData.item.userUserName}/>
           <Image style={styles.mainImage} source={{uri: itemData.item.url}} />
          {isLiked ? 
          <TouchableOpacity useForeground onPress={() => {
            dispatch(photoActions.unlikePhoto(itemData.item.id));
            setIsLiked(false);
              }} >
            <Icon name="ios-heart" />
            </TouchableOpacity>
           :
          <TouchableOpacity useForeground onPress={() => {
            dispatch(photoActions.likePhoto(itemData.item.id));
            setIsLiked(true);
              }} >
            <Icon name="ios-heart-outline" />
            </TouchableOpacity>}
           
            <Metadata name={itemData.item.userUserName} description={itemData.item.description} />
            
          </View>
      )}
      />
     
    </View>
  );
};
export const screenOptions = (navData) => {
  const dispatch = useDispatch();

  return {
    headerTitle: 'MainScreen',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
           title="Logout"
           iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
           onPress={() => {
              dispatch(authActions.logout());
            }}
           />
            
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: '#C13584',
    },
    headerTintColor: 'white',
  };
};

const styles = StyleSheet.create({
  container: {
    marginLeft:2,
    marginRight:2
  },
  mainImage: {
    backgroundColor: '#2e2d2d',
    width: '100%',
    height:300
  }
});

export default MainScreen;
