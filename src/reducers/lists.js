import * as types from '../constants/actionTypes';

const initState = {
    lists: []
}

const lists = (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_LISTS:
             //console.info('reducer RECEIVE_CONTACTS', state, action);
            return Object.assign({}, state, {
                lists: action.lists
            });
        default:
             //console.info('reducer DEFAULT', state);
            return state;
    }
};

export default lists;
