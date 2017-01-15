import * as types from '../constants/actionTypes';
import { each } from 'lodash';

const initState = {
    productslist: {}
}

const productslist = (state = initState, action) => {
    switch (action.type) {
        case types.RECEIVE_DELETE_PRODUTS:
        //console.log(state, action, 'RECEIVE_DELETE_PRODUTS');
        if(action.productslist.msg === 'OK'){
            var products = state.productslist[action.idlist];
           // console.log(state.productslist, 'produtos da lista');
            var product;
           // console.log(products, 'produtos da lista');
             each(products, (item, key) => {
              if(item.id === action.id)
              {
               // console.log(key);
                product = key;
              }

             })
            //console.log(product,'produto para eliminar');
             //console.log(products.splice(product,1), products);
             //var x = products.splice(product,1);
             state.productslist[action.idlist].splice(product, 1);
            //console.log(state, 'produtos sem o que é para eliminar');
             var temp = state;
            return  Object.assign({}, state, {
                   productslist: temp,
                   msgdelete: action.productslist.msg,
                   datadelete: action.productslist.data 
            });
            
        }
        
        case types.RECEIVE_PRODUTS:
       // console.log(state, action, 'RECEIVE_PRODUTS');
           if(action.productslist.msg === 'NOK')
           {
             temp = state.productslist;
           }
           else {
             var temp = state.productslist[action.id];
             temp.push(action.productslist.data);
             var x = {};
             x[action.id] = temp;
             temp = Object.assign(state.productslist, x);
             //console.log(temp, 'adicionar');
           }
          
          // console.log(temp, 'produtos');
            return Object.assign({}, state, {
                productslist: temp,
                msgadd: action.productslist.msg,
                dataadd: action.productslist.data
            });
        
           
        case types.RECEIVE_PRODUTS_BY_LIST:
           // console.info('reducer RECEIVE_USER_BY_ID', state, action);

            var temp = {};
            temp[action.id] = action.productslist;
            temp = Object.assign(state.productslist, temp)
          //  console.log(temp, 'reducer temp');
            return Object.assign({}, state, {
                productslist: temp
            });
        default:
             //console.info('reducer DEFAULT', state);
            return state;
    }
};

export default productslist;