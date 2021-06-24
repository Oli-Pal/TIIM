import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';


export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL};
};

export const authenticate = (id, token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, id: id, token: token });
  };
};
export const logout = () => {
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
  };

export const register = (email, confirmEmail, userName, firstName, lastName, password, city, confirmPassword, birthDate ) => {
//returning function which can async await
    return async dispatch => {
        
        const response = await fetch('http://192.168.0.112:5001/User/register' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                confirmEmail: confirmEmail,
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                password: password,
                city: city,
                confirmPassword: confirmPassword,
                birthDate: birthDate
            })
        });

        if(!response.ok) {
            throw new Error('Something went wrong during Registering!');
        }

        const resData = await response.json();
        // console.log(resData);

        dispatch(authenticate(resData.id, resData.token));
    }; 
};



export const login = (userName, password) => {
        return async dispatch => {
            
            const response = await fetch('http://192.168.0.112:5001/User/login' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName,
                    password: password,
                    
                })
            });
    
            if(!response.ok) {
                throw new Error('Something went wrong during Registering!');
            }
    
            const resData = await response.json();
            console.log(resData);
    
            dispatch(authenticate(resData.id, resData.token));
            saveDataToStorage(resData.token , resData.id);
        }; 
    };

    const saveDataToStorage = (token, id) => {
        AsyncStorage.setItem(
          'userData',
          JSON.stringify({
            token: token,
            id: id,
          })
        );
      };
      