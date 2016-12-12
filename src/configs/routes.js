import React from 'react';
import {Route, IndexRoute} from 'react-router';

// COMPONENTS
import App from '../containers/App';
import List from '../containers/List';
import ItemDetail from '../containers/ItemDetail';
import Add from '../containers/Add';
import Edit from '../containers/Edit';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={List} />,
        <Route path="/c/:id" component={ItemDetail} />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
    </Route>
);
