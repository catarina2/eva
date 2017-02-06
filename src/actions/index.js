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

export function receiveFamily(id, json) {
    //console.info('action receiveUsersList', id, json);
    return {
        type: types.RECEIVE_FAMILY,
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
    console.info('action receiveUsersFamily',id, json);
    return {
        type: types.RECEIVE_USERS_BY_FAMILY,
        users: json, 
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

export function fetchLists(token) {
    //console.log('fetchLists');
    return function(dispatch) {
        dispatch(requestContacts());
        return fetch(`http://develop.mmota.online/api/lists`, {
                 headers: {
                    'Authorization': token
                  }
            })
            .then(response => response.json())
            .then(json => dispatch(receiveLists(json)));
    }
}

export function fetchListUsers(id, token) {
   // console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/lists/${id}/users`, {
            headers: {
                    'Authorization': token
                  }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveUsersList(id, json)));
    }
}

export function fetchListProducts(id, token) {
   // console.log('fetchListsUsers', id);
    return function(dispatch) {

        return fetch(`http://develop.mmota.online/api/lists/${id}/products`, {
            headers: {
                    'Authorization': token
                  }
        })
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

export function receiveeditproducts(id, json) {
    //console.info('action receiveeditproducts', json);
    return {
        type: types.RECEIVE_EDIT_PRODUTS,
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

export function receiveUsers(json) {
   //console.info('action receiveUsers', json);
    return {
        type: types.REQUEST_USERS,
        users: json
    }
}

export function receiveeditlists(id, json) {
    //console.info('action receiveeditlists', json);
    return {
        type: types.RECEIVE_EDIT_LISTS,
        lists: json,
        id: id
    }
}

export function receiveeditusers(id, json) {
    //console.info('action receiveeditusers', json);
    return {
        type: types.RECEIVE_EDIT_USERS,
        users: json,
        id: id
    }
}

export function receiveUserRegister(json) {
    console.info('action receiveUserRegister', json);
    return {
        type: types.RECEIVE_NEW_USERS,
        userslist: json
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

export function postLists(lists, token) {
    return function(dispatch) {
    console.info(lists, token, 'postLists');
        return fetch(`http://develop.mmota.online/api/lists`, {
                method: "POST",
                 headers: {
                    'Authorization': token
                  },
                body: lists
            })
            .then(response => response.json())
            .then(json => dispatch(receivelists(json)));
    }
}


export function editLists(id, lists, token) {
    return function(dispatch) {
    //console.info(lists, 'postLists');
        return fetch(`http://develop.mmota.online/api/lists/${id}`, {
                method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                  },
                body: JSON.stringify(lists)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveeditlists(id, json)));
    }
}

export function deleteLists(id, token) {
    return function(dispatch) {
    //console.info(id, 'deleteLists');
        return fetch(`http://develop.mmota.online/api/lists/${id}`, {
                method: "DELETE", 
            headers: {
                    'Authorization': token
                  }
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

export function postProducts(id, product, token) {
    return function(dispatch) {
    //console.info(product, id, 'postProducts');
        return fetch(`http://develop.mmota.online/api/products`, {
                method: "POST",
                 headers: {
                    'Authorization': token
                  },
                body: product
            })
            .then(response => response.json())
            .then(json => dispatch(receiveproducts(id, json)));
    }
}

export function updateProducts(id, product, token) {
    return function(dispatch) {
    console.info(product, id, 'updateProducts');
        return fetch(`http://develop.mmota.online/api/products/${id}`, {
                method: 'POST',
                 headers: {
                    'Authorization': token
                  },
                body: product
            })
            .then(response => response.json())
            .then(json => dispatch(receiveeditproducts(id, json)));
    }
}

export function deleteProducts(id, idlist, token) {
    return function(dispatch) {
    //console.info(id, 'deleteProducts');
        return fetch(`http://develop.mmota.online/api/products/${id}`, {
                method: "DELETE", 
                 headers: {
                    'Authorization': token
                  }
            })
            .then(response => response.json())
            .then(json => dispatch(receivedeleteproduct(idlist, id, json)));
    }
}

export function fetchFamilyUsers(id, token) {
    console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/families/${id}/users`, {
             headers: {
                    'Authorization': token
                  }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveUsersFamily(id, json)));
    }
}



export function editUsers(id, lists, token) {
    return function(dispatch) {
    //console.info(lists, 'postLists');
        return fetch(`http://develop.mmota.online/api/users/${id}`, {
                method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                  },
                body: JSON.stringify(lists)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveeditusers(id, json)));
    }
}

export function postUsers(id, users) {
    return function(dispatch) {
    console.info(users, id, 'postUsers');
        return fetch(`http://develop.mmota.online/api/lists/${id}/users`, {
                method: 'POST',
                body: users
            })
            .then(response => response.json())
            .then(json => dispatch(receiveeditproducts(id, json)));
    }
}

export function fetchFamily(id, token) {
    //console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/families/${id}`, {
             headers: {
                    'Authorization': token
                  }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveFamily(id, json)));
    }
}
// ---------------------   AGENDA

export function requestevents(json) {
    console.info('action request events: ', json);
    return {
        type: types.REQUEST_EVENTS,
        events: json
    }
}

export function ReceiveUserEvents(id, json) {
    //console.info('action receive events: ',id, json);
    return {
        type: types.RECEIVE_USER_EVENTS,
        userevents: json,
        family: id
    }
}


export function fetchUserEvents(id, token) {
    //console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/users/${id}/events`, {
             headers: {
                    'Authorization': token
                  }})
            .then(response => response.json())
            .then(json => dispatch(ReceiveUserEvents(id, json)));
    }
}

export function fetchUserLists(id, token) {
    //console.log('fetchListsUsers', id);
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/users/${id}/lists`, {
             headers: {
                    'Authorization': token
                  }})
            .then(response => response.json())
            .then(json => dispatch(ReceiveUserEvents(id, json)));
    }
}

export function postevent(events, token) {
    return function(dispatch) {
        console.info(events, 'POST EVENTS');
        return fetch(`http://develop.mmota.online/api/events`, {
            method: "POST",
             headers: {
                    'Authorization': token
                  },
            body: events
        })
            .then(response => response.json())
            .then(json => dispatch(requestevents(json)));
    }
}

export function addUserToEvent(idEvent, iduser, token) {
    return function(dispatch) {
        console.info('addUserToEvent', idEvent, iduser);
        return fetch(`http://develop.mmota.online/api/lists/${idEvent}/users`, {
            method: "POST",
            headers: {
                    'Authorization': token
                  },
            body: iduser
        })
            .then(response => response.json())
    }
}

export function removeUserToEvent(idEvent, iduser, token) {
    return function(dispatch) {
        //console.info('removeUserToEvent', idEvent, iduser);
        return fetch(`http://develop.mmota.online/api/lists/${idEvent}/users`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
            },
            body: JSON.stringify(iduser)
        })
            .then(response => response.json())
    }
}


// ---------------------   Familia

export function receiveInviteToFamily(json) {
    //console.info('action receive events: ', json);
    return {
        type: types.RECEIVE_INVITE_TO_FAMILY,
        invite: json
    }
}


export function postInviteToFamily(invite, token) {
    return function(dispatch) {
        //console.info('POST EVENTS', invite);
        return fetch(`http://develop.mmota.online/api/invitations`, {
            method: "POST",
             headers: {
                    'Authorization': token
                  },
            body: invite
        })
            .then(response => response.json())
            .then(json => dispatch(receiveInviteToFamily(json)));
    }
}

export function postRegistar(user) {
    return function(dispatch) {
        console.info(user, 'POST Registos');
        return fetch(`http://develop.mmota.online/api/users`, {
            method: "POST",
            body: user
        })
            .then(response => response.json())
            .then(json => dispatch(receiveUserRegister(json)));
    }
}

//add/remove users LISTA
export function addUser(idlist, iduser, token) {
    return function(dispatch) {
        console.info(idlist, iduser, 'addUser');
        return fetch(`http://develop.mmota.online/api/lists/${idlist}/users`, {
            method: "POST",
             headers: {
                    'Authorization': token
                  },
            body: iduser
        })
            .then(response => response.json())
    }
}

export function postCreateFamily(familyCreate) {
    return function(dispatch) {
        return fetch(`http://develop.mmota.online/api/families`, {
            method: "POST",
            body: familyCreate
        })
            .then(response => response.json())
    }
}

export function removeUser(idlist, iduser, token) {
    return function(dispatch) {
        console.info(idlist, iduser,'removeUser');
        return fetch(`http://develop.mmota.online/api/lists/${idlist}/users`, {
            method: "DELETE",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                  },
            body: JSON.stringify(iduser)
        })
            .then(response => response.json())
    }
}
