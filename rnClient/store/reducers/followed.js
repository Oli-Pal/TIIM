import UsersFollowed from '../../models/followedByUser';
import { SET_FOLLOWED, ADD_USER_FOLLOW, SET_PHOTOLIKES, SET_LIKED } from '../actions/followed';

const initialState = {
  userFollowed: [],
  addedFollow: [],
  photoLikedDetails: [],
  likedPhoto: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOLIKES:
      return {
        photoLikedDetails: action.followed,
      };
    case SET_LIKED:
      return {
        likedPhoto: action.followed,
      };
    case SET_FOLLOWED:
      return {
        userFollowed: action.followed,
      };
    case ADD_USER_FOLLOW:
      return {
        ...state,
        userFollowed: action.follow,
      };
  }
  return state;
};
