import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';

export function receiveLists(json) {
   //console.info('action receiveLists', json);
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

export function receiveUsersFamily(id, json) {
    //console.info('action receiveUsersFamily', id, json);
    return {
        type: types.RECEIVE_USERS_BY_FAMILY,
        usersfamily: json,
        id: id
    }
}

export function requestContacts() {
    // console.info('action requestContacts');
    return {
        type: types.REQUEST_CONTACTS
    }
}


// THUNKS

export function fetchLists() {
    //console.log('fetchLists');
    return function(dispatch) {
        dispatch(requestContacts());
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

export function receiveproducts(id, json) {
    //console.info('action receiveproducts', json);
    return {
        type: types.RECEIVE_PRODUTS,
        productslist: json,
        id: id
    }
}

export function receivedeleteproduct(idlist, id, json) {
  //  console.info('action receiveproducts', json);
    return {
        type: types.RECEIVE_DELETE_PRODUTS,
        productslist: json,
        id: id,
        idlist:idlist
    }
}

export function receivelists(json) {
   // console.info('action receivelists', json);
    return {
        type: types.REQUEST_LISTS,
        lists: json
    }
}

export function receivelistsdelete(id, json) {
   // console.info('action receivelists', json);
    return {
        type: types.DELETE_LISTS,
        lists: json,
        id: id
    }
}

export function postLists(lists) {
    return function(dispatch) {
    //console.info(lists, 'postLists');
        return fetch(`http://develop.mmota.online/api/lists`, {
                method: "POST",
                body: lists
            })
            .then(response => response.json())
            .then(json => dispatch(receivelists(json)));
    }
}


export function editLists(id, lists) {
    return function(dispatch) {
    //console.info(lists, 'postLists');
        return fetch(`http://develop.mmota.online/api/lists/${id}`, {
                method: "PUT",
                body: lists
            })
            .then(response => response.json())
            .then(json => dispatch(receivelists(id, json)));
    }
}

export function deleteLists(id) {
    return function(dispatch) {
    //console.info(id, 'deleteLists');
        return fetch(`http://develop.mmota.online/api/lists/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json => dispatch(receivelistsdelete(id, json)));
    }
}

export function fetchProducts(id) {
    return function(dispatch) {
    //console.info('fetchProducts');
        return fetch(`http://develop.mmota.online/api/products`)
            .then(response => response.json());
    }
}

export function postProducts(id, product) {
    return function(dispatch) {
    //console.info(product, id, 'postProducts');
        return fetch(`http://develop.mmota.online/api/products`, {
                method: "POST",
                body: product
            })
            .then(response => response.json())
            .then(json => dispatch(receiveproducts(id, json)));
    }
}

export function updateProducts(id, product) {
    return function(dispatch) {
    //console.info(product, id, 'postProducts');
        return fetch(`http://develop.mmota.online/api/products/${id}`, {
                method: "PUT",
                body: product
            })
            .then(response => response.json())
            .then(json => dispatch(receiveproducts(id, json)));
    }
}

export function deleteProducts(id, idlist) {
    return function(dispatch) {
    //console.info(id, 'deleteProducts');
        return fetch(`http://develop.mmota.online/api/products/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json => dispatch(receivedeleteproduct(idlist, id, json)));
    }
}

export function fetchFamilyUsers(id) {
   // console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/family/${id}/users`)
            .then(response => response.json())
            .then(json => dispatch(receiveUsersFamily(id, json)));
    }
}