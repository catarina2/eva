import * as types from '../constants/actionTypes';

const initState = {
    users: {}
}

const users = (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_EDIT_USERS:
            console.info('reducer RECEIVE_EDIT_USERS', state, action);
        case types.REQUEST_USERS:
            console.info('reducer REQUEST_USERS', state, action);

            var temp = {};
            temp[action.id] = action.users.data;
            temp = Object.assign(state.users, temp);
            return Object.assign({}, state, {
                users: temp
            });
        default:
             //console.info('reducer DEFAULT', state);
            return state;
    }
};
