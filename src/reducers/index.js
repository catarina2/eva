import {combineReducers} from 'redux';
import lists from './lists';
import userslist from './userslist';
import productslist from './productslist';
import users from './users';
import events from './agenda.js';

const reducers = combineReducers({
    lists, userslist, productslist, users, events
});

export default reducers;
