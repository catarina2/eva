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
        case types.RECEIVE_EDIT_EVENTS:
            console.log(state, action, 'RECEIVE_EDIT_EVENTS');

            var event = state.events[action.events.data.id].data;
            each(event, (item, key) => {
                if(item.id === action.id)
                {
                    event = key;
                }

            })
            var x = {};
            x[event] = action.events.data;
            var temp = Object.assign(event, x);

            console.log(temp, 'produto');
            var rv = {};
            rv["data"] = temp;
            var r = {};
            r[action.events.data.id] = rv;
            event = Object.assign(state.events, r);
            return  Object.assign({}, state, {
                events: state.events,
                msgedit: action.events.msg,
            });
        case types.RECEIVE_DELETE_EVENTS:
            //console.log(state, action, 'RECEIVE_DELETE_PRODUTS');
            if(action.events.msg === 'OK'){
                var events = state.events[action.id].data;
                var event;
                each(events, (item, key) => {
                    if(item.id === action.id)
                    {
                        event = key;
                    }
                })
                events.splice(event, 1);
                if(events.length === 0){
                    var rv = {};
                    rv["data"] = "List doesn't have products";
                }
                else{
                    var rv = {};
                    rv["data"] = events;
                }
                var x = {};
                x[action.id] = rv;
                var temp = Object.assign(state.events, x);

                return  Object.assign({}, state, {
                    events: temp,
                    msgdelete: action.events.msg,
                    datadelete: action.events.data
                });

            }

        case types.RECEIVE_USER_EVENTS:
            //console.info('reducer RECEIVE_USER_EVENTS', state, action);
            return Object.assign({}, state, {
                events: action.userevents.data
            });
        case types.REQUEST_EVENTS:
            //console.info('reducer REQUEST_EVENTS', state, action);
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