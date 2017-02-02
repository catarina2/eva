/**
 * Created by Diogo on 31/01/2017.
 */


import * as types from '../constants/actionTypes';
import { each } from 'lodash';

const initState = {
    events: []
}



const events = (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_USER_EVENTS:
            console.info('reducer RECEIVE_USER_EVENTS', state, action);
            return Object.assign({}, state, {
                events: action.userevents.data
            });
        case types.REQUEST_EVENTS:
            console.info('reducer REQUEST_EVENTS', state, action);
            var x = {};
            var temp;
            if(action.events.msg === 'NOK')
            {
                temp = state.events;
            }
            else
            {
                x[state.events.length] = action.events.data;
                // console.log(x);
                temp = Object.assign(state.events, x);
                console.log(temp, 'listsOK');
            }

            return Object.assign({}, state, {
                events: temp,
                msgadd: action.events.msg,
                dataadd: action.events.data
            });
        default:
            //console.info('reducer DEFAULT', state);
            return state;
    }
};

export default events;