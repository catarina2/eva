import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';

// COMPONENTS
import App from '../containers/App';
import List from '../containers/List';
import Inicioeva from '../containers/Inicioeva';
import Agend from '../containers/Agend';
import Perfil from '../containers/Perfil';
import Def from '../containers/Def';
import Login from '../containers/Login';
//import Def from '../containers/Def';



export default (
    <Route history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Inicioeva} />
            <Route path="list" component={List} />
            <Route path="mirror" component={List} />
            <Route path="definition" component={Perfil}/>
            <Route path="definition/perfil" component={Def} />
            <Route path="agend" component={Agend} />
        </Route>
    </Route>
);
