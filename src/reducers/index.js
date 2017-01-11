import {combineReducers} from 'redux';
import lists from './lists';
import userslist from './userslist';
import productslist from './productslist';

const reducers = combineReducers({
    lists, userslist, productslist
});

export default reducers;
