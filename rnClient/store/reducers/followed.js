import UsersFollowed from '../../models/followedByUser';
import {
  SET_FOLLOWED
} from '../actions/followed';

const initialState = {
    userFollowed: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWED:
      return {
        userFollowed: action.followed
      };
};
return state;

};
