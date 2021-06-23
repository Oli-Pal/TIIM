import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Platform
  } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/HeaderButton';
import ImagePicker from '../../components/ImagePicker';

  import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/Colors';
import { insertPhoto } from '../../helpers/db';
  

const AddPostScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

 
  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
    console.log(imagePath);

  };
  const imageUploadHandler = async () => {
    
    console.log(selectedImage);
    let newFile = {uri: selectedImage, type:`test/${selectedImage.split('.')[3]}`, name: `test.${selectedImage.split('.')[3]}` }
    // console.log(newFile)
    uploadHandler(newFile);
    
  };

  const uploadHandler =  (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'almudner');
    data.append('cloud_name','dcuxtexqa');
    
   
    fetch('https://api.cloudinary.com/v1_1/dcuxtexqa/image/upload', {
      method: 'POST',
      body: data
    }).then(res => res.json())
    .then(data => {console.log(data);
      // console.log(userId);
      // fetch('http://192.168.0.112:5001/Photo',{
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'multipart/form-data'
      //   },
      //   body: {
      //     id: data.asset_id ,
      //     file: 'http://res.cloudinary.com/dcuxtexqa/image/upload/v1624486287/ph23zgmpm32mqdxmnwb1.jpg',
      //     description: 'DDD',
      //     dateAdded: data.created_at,
      //     userId: userId
      //   }
      // }).then(ress => ress.json).then(dataa => console.log(dataa));
    });
  }
      // insertPhoto(data.asset_id, data.url, 'Testowy', data.created_at, userId);
    // props.navigation.goBack();
  
  
  // const insert = (Id, Url, Description, DateAdded, UserId) => {

//  }
 
    return (
     
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
       
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={imageUploadHandler}
        />
      </View>
    
    );
}

export const screenOptions = (navData) => {
    const dispatch = useDispatch();

    return {
      headerTitle: 'AddPostScreen',
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
      ) ,
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
    form: {
      margin: 30,
    },
    label: {
      fontSize: 18,
      marginBottom: 15,
    },
    textInput: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
    },
});

export default AddPostScreen;