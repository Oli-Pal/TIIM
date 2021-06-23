import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import Card from './Card';
const padding = 12;
const profileImageSize = 36;


const SearchCard = (props) => {
    
      let TouchableCmp = TouchableOpacity;
      if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
      }

  return (
      <Card style={styles.container}>
     <TouchableCmp onPress={props.onUserPress} > 
        <View style={[styles.row, styles.padding]}>
            <View style={styles.row}>
            <Image style={styles.avatar} source={props.mainPhoto} />
            <Text style={styles.text}>{props.name}</Text>
            
            </View>
            <View style={styles.padding}>
            <Text style={styles.subtitle}>Name: {props.firstname}</Text>
            <Text style={styles.subtitle}>Surname: {props.surname}</Text>
            <Text style={styles.text}>City: {props.city}</Text>

            </View>
            </View>
            </TouchableCmp>
          
            </Card>
  );
};


const styles = StyleSheet.create({
    container: {
        margin:10,
        marginTop: 10,
        paddingHorizontal: 10
      },
      iconBarContainer: {
        flexDirection: 'row',
        
      },
      mainImage: {
        backgroundColor: '#2e2d2d',
        width: '100%',
        height:300
      },
      text: { fontWeight: '600' },
      subtitle: {
        opacity: 0.8,
      },
      col: {
          
          justifyContent: 'space-between',
          alignItems: 'center'
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      rowe: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5
      },
      padding: {
        padding,
      },
      avatar: {
        aspectRatio: 1,
        backgroundColor: '#2e2d2d',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#2e2d2d',
        borderRadius: profileImageSize / 10,
        width: profileImageSize + 10,
        height: profileImageSize + 10,
        resizeMode: 'cover',
        marginRight: padding,
      },
});

export default SearchCard;
