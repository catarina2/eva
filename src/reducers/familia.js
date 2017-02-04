/**
 * Created by Diogo on 31/01/2017.
 */


import * as types from '../constants/actionTypes';
import { each } from 'lodash';

const initState = {
    family: []
}



const family = (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_INVITE_TO_FAMILY:
            var x = {};
            var temp;
            if(action.family.msg === 'NOK')
            {
                temp = state.family;
            }
            else
            {
                x[state.family.length] = action.family.data;
                // console.log(x);
                temp = Object.assign(state.family, x);
                console.log(temp, 'listsOK');
            }

            return Object.assign({}, state, {
                family: temp,
                msgadd: action.family.msg,
                dataadd: action.family.data
            });
        default:
            //console.info('reducer DEFAULT', state);
            return state;
    }
};

export default family;