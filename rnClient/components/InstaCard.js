import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
const padding = 12;
const profileImageSize = 36;


const InstaCard = (props) => {
    
      let TouchableCmp = TouchableOpacity;
      if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
      }

  return (
         <View style={styles.container}>
            <TouchableCmp onPress={props.onAvatarPress} > 
        <View style={[styles.row, styles.padding]}>
            <View style={styles.row}>
            <Image style={styles.avatar} source={props.avatarImage} />
            <Text style={styles.text}>{props.name}</Text>
            </View>
            </View>
            </TouchableCmp>
            <TouchableCmp useForeground onPress={props.onImagePress} >
           <Image style={styles.mainImage} source={props.sourceImg} />
        </TouchableCmp>
          <View style={styles.iconBarContainer}>
          <TouchableCmp useForeground onPress={props.onHeartPress} >
          <Ionicons style={{ marginRight: 8 }} name={props.heartShape} size={26} color={props.heartColor} />
            </TouchableCmp>
            <TouchableCmp useForeground onPress={props.onCommentPress} >
            <Ionicons style={{ marginRight: 8 }} name={props.commentShape} size={26} color="black" />
            </TouchableCmp>
            </View>
            <View>
            <View style={styles.padding}>
            <Text style={styles.text}>{props.name}</Text>
            <Text style={styles.subtitle}>{props.description}</Text>
            </View>
            </View>
            </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginLeft:2,
        marginRight:2
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
        borderRadius: profileImageSize / 2,
        width: profileImageSize,
        height: profileImageSize,
        resizeMode: 'cover',
        marginRight: padding,
      },
});

export default InstaCard;
