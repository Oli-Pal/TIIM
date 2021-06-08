import UsersFollowed  from '../../models/followedByUser';

export const SET_FOLLOWED = 'SET_FOLLOWED';


export const fetchFollowed = () => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      try {
        const response = await fetch(
         `http://192.168.0.112:5001/Photo/followees`,
         { 
            method: 'GET', 
            headers: {
            'Authorization': `Bearer ${token}`
                }
        }
         
        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        
        const resData = await response.json();
        // console.log(resData);

        const userFollowed = [];
        for (const key in resData) {
          userFollowed.push(
            new UsersFollowed(
              resData[key].id,
              resData[key].url,
              resData[key].description,
              resData[key].dateAdded,
              resData[key].userId,
              resData[key].userUserName,
              resData[key].userFirstName,
              resData[key].userLastName,
              resData[key].userPhotoUrl
            )
          );
        }
  
        dispatch({
          type: SET_FOLLOWED,
          followed: userFollowed
        });
      } catch (err) {
        throw err;
      }
    };
  };