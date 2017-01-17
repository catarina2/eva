import {combineReducers} from 'redux';
import lists from './lists';
import userslist from './userslist';
import productslist from './productslist';
import users from './users';

const reducers = combineReducers({
    lists, userslist, productslist, users
});

export default reducers;
