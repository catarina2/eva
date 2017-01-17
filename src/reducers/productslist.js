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
            var products = state.productslist[action.idlist].data;
            var product;
             each(products, (item, key) => {
              if(item.id === action.id)
              {
                product = key;
              }

             })
             products.splice(product, 1);
            if(products.length === 0){
              var rv = {};
              rv["data"] = "List doesn't have products";
            }
            else{
            var rv = {};
            rv["data"] = products;
            }
            var x = {};
             x[action.idlist] = rv;
             var temp = Object.assign(state.productslist, x);
             
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
                var products;
                //console.log(state.productslist[action.id].data, 'listasasa');
                if(state.productslist[action.id].data !== "List doesn't have products")
                {temp = state.productslist[action.id].data;
                 //console.log(temp, 'temp produtoslista');
                 temp.push(action.productslist.data);
                 //console.log(temp, 'temp produtoslista1');
                var rv = {};
                 rv["data"] = temp;
                 // console.log(rv);
                 var x = {};
                 x[action.id] = rv;
                 products = Object.assign(state.productslist, x);
               }
               else {
                  var r = [];
                  r[0] = action.productslist.data;
                  var rv = {};
                  rv["data"] = r;
                 // console.log(rv, 'rvprodutos');
                  var x = {};
                  x[action.id] = rv;
                 // console.log(x, 'x produtos');
                  products = Object.assign(state.productslist, x);
               }
            // console.log(products, 'adicionar');
           }
           
          
          // console.log(temp, 'produtos');
            return Object.assign({}, state, {
                productslist: products,
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