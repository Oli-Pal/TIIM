import UserToSearch  from '../../models/userstoSearch';
export const SEARCH_USERS = 'SEARCH_USERS';


export const searchUsers = (search) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      // search = 'tes';
      try {
        const response = await fetch(
         `http://192.168.0.112:5001/User/search?KeyWord=${search}`,
         { 
          method: 'GET', 
          headers: {
          'Authorization': `Bearer ${token}`
              },
             
      }
        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        const loadedUsers = [];
        for (const key in resData) {
          loadedUsers.push(
            new UserToSearch(
              resData[key].id,
              resData[key].email,
              resData[key].userName,
              resData[key].description,
              resData[key].mainPhotoUrl,
              resData[key].city,
              resData[key].firstName,
              resData[key].lastName,
              resData[key].birthDate,
              resData[key].joinDate
                          )
          );
        }
  
        dispatch({
          type: SEARCH_USERS,
          users: loadedUsers,
          search: search
        });
      } catch (err) {
        throw err;
      }
    };
  };

  