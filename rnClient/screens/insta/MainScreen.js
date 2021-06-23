import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Platform, View, Button, StyleSheet, Text, ActivityIndicator, ScrollView, Image, LayoutAnimation, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableOpacity, TouchableOpacityBase } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';

import * as followedActions from '../../store/actions/followed';
import * as authActions from '../../store/actions/auth';
import * as photoActions from '../../store/actions/photos';
import InstaCard from '../../components/InstaCard';


const MainScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [error, setError] = useState();

  const followed = useSelector((state) => state.followed.userFollowed);
  // const liked = useSelector((state) => state.likedPhotos);
  
  const dispatch = useDispatch();

  const getFollowed = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    
    try {
      await dispatch(followedActions.fetchFollowed());
      

    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', getFollowed); 
    
    return () => {
     unsubscribe();
    };
  }, [getFollowed]);

  useEffect(() => {
    setIsLoading(true);
    getFollowed().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, getFollowed]);

  // useEffect(() => {

  //   dispatch(photoActions.loadLikes());
  // }, [dispatch]);

  LayoutAnimation.easeInEaseOut();



    const likeHandler = (id) => {
      try {
        dispatch(photoActions.likePhoto(id));
        setIsLiked(!isLiked);
      } catch (error) {
        console.log(error);
      }
  
   
  };
  
  const dislikeHandler = async (id) => {
    try {
      dispatch(photoActions.dislikePhoto(id));
      setIsLiked(false);
    } catch (error) {
      console.log(error);
    }

  };

  const selectItemHandler = (id, username) => {
    props.navigation.navigate('UserDetails', {
      userId: id,
      UserName: username,
    });
  };



  return (
    
    <View style={styles.screen}>
      <FlatList onRefresh={getFollowed} 
      data={followed } refreshing={isRefreshing} 
      keyExtractor={item => item.id}
      renderItem={(itemData) => (
       
        <InstaCard 
         onAvatarPress={() => {selectItemHandler(itemData.item.userId, itemData.item.userUserName)}}
         avatarImage={{uri: itemData.item.userPhotoUrl}}
         name={itemData.item.userUserName}
         sourceImg={{uri: itemData.item.url}}
         onImagePress={() => {dislikeHandler(itemData.item.id)}}
         onHeartPress={() => {likeHandler(itemData.item.id)}}
         heartColor={isLiked ? "red" : "black"}
         heartShape={isLiked ? "ios-heart" : "ios-heart-outline"}
         onCommentPress={() =>{}}
         commentShape="ios-chatbubbles-outline"
         description={itemData.item.description}
        />
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
 
});

export default MainScreen;
