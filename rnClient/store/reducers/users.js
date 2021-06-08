import UserToSearch from '../../models/userstoSearch';
import {
 SEARCH_USERS
} from '../actions/users';

const initialState = {
  loadedUsers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        loadedUsers: action.users
      };
    };
    return state;
};
