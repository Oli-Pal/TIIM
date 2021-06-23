import UsersFollowed  from '../../models/followedByUser';
import isLiked from '../../models/isLiked';
import LikedPhotoDetails from "../../models/LikedPhotoDetails";

export const SET_FOLLOWED = 'SET_FOLLOWED';
export const ADD_USER_FOLLOW = 'ADD_USER_FOLLOW';
export const SET_LIKED = 'SET_LIKED';

export const SET_PHOTOLIKES = 'SET_PHOTOLIKES';


export const fetchPhotoLikes = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
       `http://192.168.0.112:5001/PhotoLike/${id}`,
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
      const photoLikedDetails = [];
      for (const key in resData) {
        photoLikedDetails.push(
          new LikedPhotoDetails(
            resData[key].id,
            resData[key].email,
            resData[key].userName,
            resData[key].mainPhotoUrl,
            resData[key].firstName,
            resData[key].lastName
          )
        );
      }

      dispatch({
        type: SET_PHOTOLIKES,
        followed: photoLikedDetails,
        id: id
      });
    } catch (err) {
      throw err;
    }
  };
};



export const isPhotoLiked = (id) => {
  return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().followed.id;
      try {
        const response = await fetch(
         `http://192.168.0.112:5001/PhotoLike/isLiked?PhotoId=${id}&UserId=${userId}`,
         { 
            method: 'GET', 
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
                }
        }
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        
        const resData = await JSON.parse(response);
        const likedPhoto = [];
        for (const key in resData) {
          likedPhoto.push(
            new isLiked(
              resData[key].isTrue
            )
          );
        }
        // console.log(likedPhoto);

  
        dispatch({
          type: SET_LIKED,
          followed: likedPhoto,
          id: id
        });
      } catch (err) {
        throw err;
      }
    };
}



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

  export const followUser = (userId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(
             `http://192.168.0.112:5001/Follow/follow/${userId}`,
             { 
                method: 'POST', 
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                    }
            }
            );
      
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
            const resData = await response.json();
            // console.log(resData);
    
            dispatch({
              type: ADD_USER_FOLLOW,
              follow: userId
            });
          } catch (err) {
            throw err;
          }
    };
};