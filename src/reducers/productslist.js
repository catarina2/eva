import * as types from '../constants/actionTypes';

const initState = {
    productslist: {}
}

const users = (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_PRODUTS_BY_LIST:
            //console.info('reducer RECEIVE_USER_BY_ID', state, action);

            var temp = {};
            temp[action.id] = action.productslist;
            temp = Object.assign(state.productslist, temp)

            return Object.assign({}, state, {
                productslist: temp
            });
        default:
             //console.info('reducer DEFAULT', state);
            return state;
    }
};

export default users;