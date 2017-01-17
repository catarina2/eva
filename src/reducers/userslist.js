import * as types from '../constants/actionTypes';

const initState = {
    userslist: {}
}

const users = (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_USERS_BY_FAMILY:
        //console.info('reducer RECEIVE_USERS_BY_FAMILY', state, action);
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
