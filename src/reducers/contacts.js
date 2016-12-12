import * as types from '../constants/actionTypes';

const initState = {
    isFetching: true,
    query: '',
    items: []
}

const contacts = (state = initState, action) => {
    switch (action.type) {
        case types.REQUEST_CONTACTS:
            // console.info('reducer REQUEST_CONTACTS', state, action);
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_CONTACTS:
            // console.info('reducer RECEIVE_CONTACTS', state, action);
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items
            });
        default:
            // console.info('reducer DEFAULT', state);
            return state;
    }
};

export default contacts;
