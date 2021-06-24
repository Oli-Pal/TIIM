import React from 'react';
import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';
//   import { useDispatch } from 'react-redux';
// import * as authActions from '../../store/actions/auth';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import CustomHeaderButton from '../../components/HeaderButton';


const UserDetailsScreen = (props) => {

  // const userId = props.route.params.userId;

  // const selectedUser = useSelector((state) => state.followed.userFollowed.find((user) => user.userId === userId));

    return (
        <View style={styles.screen}>
            <Text>dddd</Text>
        </View>
        
    );
}

export const screenOptions = (navData) => {
  // const dispatch = useDispatch();

    return {
      headerTitle: 'User Details',
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      //       <Item
      //        title="Logout"
      //        iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
      //        onPress={() => {
      //           dispatch(authActions.logout());
      //         }}
      //        />
              
      //   </HeaderButtons>
      // ),
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
    }
});

export default UserDetailsScreen;