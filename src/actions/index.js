import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';

export function receiveLists(json) {
   // console.info('action receiveLists', json);
    return {
        type: types.RECEIVE_LISTS,
        lists: json
    }
}


export function receiveUsersList(id, json) {
    //console.info('action receiveUsersList', id, json);
    return {
        type: types.RECEIVE_USERS_BY_LIST,
        userslist: json,
        id: id
    }
}

export function receiveProdutsList(id, json) {
    //console.info('action receiveProdutsList', id, json);
    return {
        type: types.RECEIVE_PRODUTS_BY_LIST,
        productslist: json,
        id: id
    }
}


// THUNKS

export function putContact(id, data) {
   // console.log(id, data);

    return function(dispatch) {
        return fetch(`http://catblog.myddns.me/api/contacts/${id}`, {
                method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            })
            .then(response => response.json());
    }
}

export function postContact(data) {
    return function(dispatch) {
        return fetch(`http://catblog.myddns.me/api/contacts`, {
                method: 'POST',
                body: data
            })
            .then(response => response.json());
    }
}


export function fetchLists() {
    //console.log('fetchLists');
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/lists`)
            .then(response => response.json())
            .then(json => dispatch(receiveLists(json)));
    }
}

export function fetchListUsers(id) {
   // console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/lists/${id}/users`)
            .then(response => response.json())
            .then(json => dispatch(receiveUsersList(id, json)));
    }
}

export function fetchListProducts(id) {
   // console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/lists/${id}/products`)
            .then(response => response.json())
            .then(json => dispatch(receiveProdutsList(id, json)));
    }
}