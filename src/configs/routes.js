import React from 'react';
import {Route, IndexRoute} from 'react-router';

// COMPONENTS
import App from '../containers/App';
import List from '../containers/List';
import ItemDetail from '../containers/ItemDetail';
import Add from '../containers/Add';
import Edit from '../containers/Edit';
import Inicioeva from '../containers/Inicioeva';
import Agend from '../containers/Agend';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Inicioeva} />,
        <Route path="/list" component={List} >
            <Route path="/c/:id" component={ItemDetail} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
        </Route>
        <Route path="/mirror" component={List} >
            <Route path="/c/:id" component={ItemDetail} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
        </Route>
        <Route path="/definition" component={List} >
          <Route path="/c/:id" component={ItemDetail} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
        </Route>
        <Route path="/agend" component={Agend} >
           <Route path="/c/:id" component={ItemDetail} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
        </Route>
    </Route>
);
