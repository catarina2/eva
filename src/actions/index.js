import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';

export function requestContacts() {
    // console.info('action requestContacts');
    return {
        type: types.REQUEST_CONTACTS
    }
}

export function receiveContacts(json) {
    // console.info('action receiveContacts', json);
    return {
        type: types.RECEIVE_CONTACTS,
        items: json
    }
}

export function requestContactById() {
    // console.info('action requestContactById');
    return {
        type: types.REQUEST_CONTACT_BY_ID
    }
}

export function receiveContactById(json) {
    // console.info('action receiveContactById', json);
    return {
        type: types.RECEIVE_CONTACT_BY_ID,
        items: json
    }
}

// THUNKS

export function putContact(id, data) {
    console.log(id, data);

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

export function fetchContacts() {
    return function(dispatch) {
        dispatch(requestContacts());

        return fetch(`http://catblog.myddns.me/api/contacts`)
            .then(response => response.json())
            .then(json => dispatch(receiveContacts(json)));
    }
}

export function fetchContactById(id) {
    return function(dispatch) {
        dispatch(requestContactById(id));

        return fetch(`http://catblog.myddns.me/api/contacts/${id}`)
            .then(response => response.json())
            .then(json => dispatch(receiveContactById(id, json)));
    }
}
