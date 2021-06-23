
import { fetchLikes } from '../../helpers/db';


export const ADD_LIKE = 'ADD_LIKE';
export const ADD_UNLIKE = 'ADD_UNLIKE';
export const SET_LIKES = 'SET_LIKES';

export const ADD_PHOTO = 'ADD_PHOTO';

export const loadLikes = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchLikes();
      console.log(dbResult);
      dispatch({ type: SET_LIKES, likes: dbResult.rows._array });
    } catch (err) {}
  };
};


export const likePhoto = (id) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(
             `http://192.168.0.112:5001/PhotoLike`,
             { 
                method: 'POST', 
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                    },
                body: JSON.stringify({
                    id
                })
            }
             
            );
      
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
            
            const resData = await JSON.parse(response);
            console.log(resData);
    
            dispatch({
              type: ADD_LIKE,
              photos: {
                  LikerId: resData.LikerId,
                  PhotoId: resData.PhotoId,
                  DateLiked: resData.DateLiked
              }
            });
          } catch (err) {
            throw err;
          }
    }

}

export const dislikePhoto = (id) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(
             `http://192.168.0.112:5001/PhotoLike?Id=${id}`,
             { 
                method: 'DELETE', 
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                    },
                body: JSON.stringify({
                    id
                })
            }
            );
      
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
            
            const resData = await JSON.parse(response);
            // console.log(resData);
    
           
      
            dispatch({
              type: ADD_UNLIKE,
              photos: {
                  LikerId: resData.LikerId,
                  PhotoId: resData.PhotoId,
                  DateLiked: resData.DateLiked
              }
            });
          } catch (err) {
            throw err;
          }
    }

}


export const addPhoto = (file, description) => {
  
  return async (dispatch, getState) => {
      const userId = getState.auth.userId;
      const token = getState().auth.token;
         const response = await fetch('http://192.168.0.112:5001/Photo' , {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          body: data
      });
    if (!response.ok)
      throw new Error('Something went wrong while fetching maps');

    const resData = await response.json();
      console.log(resData);
      dispatch({
        type: ADD_PHOTO,
        },
      );
   
  };
};
