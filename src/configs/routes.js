import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';

// COMPONENTS
import App from '../containers/App';
import List from '../containers/List';
import Mirror from '../containers/Mirror';
import Inicioeva from '../containers/Inicioeva';
import Agend from '../containers/Agend';
import Perfil from '../containers/Perfil';
import Def from '../containers/Def';
import Login from '../containers/Login';
import Familia from '../containers/Familia';
import Callback from '../containers/Callback';
import Register from '../containers/Register';

//import Def from '../containers/Def';



export default (
    <Route history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="callback" component={Callback} />
            <Route path="register" component={Register} />
            <Route path="/" component={Inicioeva} />
            <Route path="lists" component={List} />
            <Route path="mirror" component={Mirror} />
            <Route path="definition" component={Perfil}/>
            <Route path="definition/profile" component={Def} />
            <Route path="definition/familia" component={Familia} />
            <Route path="calendar" component={Agend} />
        </Route>
    </Route>
);
