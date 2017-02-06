import * as types from '../constants/actionTypes';
import { each } from 'lodash';

const initState = {
    userslist: {}
}

const users = (state = initState, action) => {

    switch (action.type) {
        case types.RECEIVE_NEW_USERS:
        console.log('RECEIVE_NEW_USERS reducer', action)
        return Object.assign({}, state, {
                data: action.userslist.data, 
                msg: action.userslist.msg
            });
        case types.RECEIVE_FAMILY:
        //console.log(action, 'RECEIVE_FAMILY');
         return Object.assign({}, state, {
                family: action.userslist.data.name
            });

        case types.RECEIVE_EDIT_USERS:
           //console.info('reducer RECEIVE_EDIT_USERS', state, action);
            var users = state.users;
            var user;
            each(users, (item, key) => {
              if(item.id === action.id)
              {
                user = key;
              }

             })

            console.log(user);

            var temp = {};
            temp[user] = action.users.data;
            temp = Object.assign(state.users, temp);
            //console.log(temp);
            return Object.assign({}, state, {
                userslist: temp, 
                msg: action.users.msg
            });

        case types.RECEIVE_USERS_BY_FAMILY:
        console.info('reducer RECEIVE_USERS_BY_FAMILY', state, action);
        return Object.assign({}, state, {
                users: action.users.data
            });
        case types.RECEIVE_USERS_BY_LIST:
            //console.info('reducer RECEIVE_USER_BY_ID', state, action);

            var temp = {};
            temp[action.id] = action.userslist.data;
            temp = Object.assign(state.userslist, temp);
            return Object.assign({}, state, {
                userslist: temp
            });
        default:
             //console.info('reducer DEFAULT', state);
            return state;
    }
};

export default users;
