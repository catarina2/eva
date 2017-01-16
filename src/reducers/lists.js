import * as types from '../constants/actionTypes';
import { each } from 'lodash';

const initState = {
    lists: []
}

const lists = (state = initState, action) => {
    switch (action.type) {
        case types.DELETE_LISTS:
        //console.info('reducer DELETE_LISTS', state, action);
        var lists = state.lists;
        var list;
        var lposition;
         each(lists, (item, key) => {
              if(item.id === action.id)
              {
               // console.log(key);
                list = key;
              }
             lposition = key;
             });
         //console.log(list, lposition, 'lista a ser removida do state');
         //var temp = state.lists.pop(list);
         state.lists.splice(list, 1);
        // console.log(state, 'lista sem a que se apagou');
         return Object.assign({}, state, {
                lists: state.lists,
                msgdelete: action.lists.msg,
                datadelete: action.lists.data
            });
        case types.REQUEST_LISTS:
      //console.info('reducer REQUEST_LISTS', state, action);
           var x = {};
           var temp;
           if(action.lists.msg === 'NOK')
           {
            temp = state.lists;
           }
           else
           {
               x[state.lists.length] = action.lists.data;
              // console.log(x);
               temp = Object.assign(state.lists, x);
             //  console.log(temp, 'lists');
           }
          
            return Object.assign({}, state, {
                lists: temp,
                msgadd: action.lists.msg,
                dataadd: action.lists.data
            });
        case types.RECEIVE_LISTS:
            // console.info('reducer RECEIVE_CONTACTS', state, action);
            return Object.assign({}, state, {
                lists: action.lists
            });
        default:
             //console.info('reducer DEFAULT', state);
            return state;
    }
};

export default lists;