import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import PerfilC from '../components/Perfil'

class Perfil extends Component {
     constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            showHideSidenav: 'hidden', 
            perfil: [{name:'Perfil', icon: 'perfil'}, {name:'Segurança', icon: 'seg'}, {name:'Notificações', icon: 'notif'}, {name:'Contas', icon: 'account'}, {name:'Sons', icon: 'sounds'}, {name:'Widgets', icon: 'widgets'}, {name:'Idioma', icon: 'lang'}, {name:'Acessibilidade', icon: 'access'}, {name:'Versão', icon: 'version'}]
        }
    }

    render() {
       console.log(this.state.perfil);
        var showNav;
        if(this.state.showHideSidenav === 'hidden')
        {
            showNav = <button type="button" className="btn btn-perfil" aria-label="Left Align" onClick={this.handleClick}>
                            <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                        </button>;
        }
        else {
            showNav = <div className="modal">
                        <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper-perfil" role="navigation" >
                        <ul className="nav nav-perfil sidebar-nav">
                            <li className="sidebar-brand">
                                    <Link to={`/agend`}>
                                        <div className="row">
                                        <div className="col-xs-2">
                                             <input type="button" className="btn btn-smagend" />
                                        </div>
                                        <div className="col-xs-10 hamburguer">
                                            <h3><b>Agenda</b> Familiar</h3>
                                        </div>
                                        </div>
                                        
                                    </Link>
                                    
                            </li>
                            <li>
                                <Link to={`/list`}>
                                        <div className="row">
                                        <div className="col-xs-2">
                                             <input type="button" className="btn btn-smlist" />
                                        </div>
                                        <div className="col-xs-10 hamburguer">
                                            <h3><b>Lista de Comptas</b></h3>
                                        </div>
                                        </div>
                                </Link>
                            </li>
                            <li>
                                    <Link to={`/mirror`}>
                                        <div className="row">
                                        <div className="col-xs-2">
                                             <input type="button" className="btn btn-smmirror" />
                                        </div>
                                        <div className="col-xs-10 hamburguer">
                                            <h3><b>Espelho</b></h3>
                                        </div>
                                        </div>
                                    </Link>
                            </li>
                            <li>
                                    <div className="row" onClick={this.handleClick}>
                                    <div className="col-xs-2">
                                         <input type="button" className="btn btn-smdef" />
                                    </div>
                                    <div className="col-xs-10 hamburguer">
                                        <h3><b>Definições</b></h3>
                                    </div>
                                    </div>
                            </li>
                        </ul>
                    </nav>
                 </div>;

        }
        return (
            <div>
                <header className="header-perfil">
                    <div className="container">
                        <h2>Definições</h2>
                        {showNav}
                        <button className="btn setaperfil"></button>
                    </div>
                </header>
                <section>
                        <div className='container perfil'>
                        <ul className="list-group">
                            {this.state.perfil.map((item, key) => {
                                return (
                                    <li key={key}>
                                            <PerfilC item={item} key={key}/>
                                    </li>
                                );
                            })}
                        </ul>
                        <hr/>
                        </div>
                </section>
                <footer>
                    <div className="row">
                        <div className="col-xs-2">
                             <button className="btn btn-imageclassperfil"></button>
                        </div>
                        <div className="col-xs-8">
                            <Link to={`/`}>
                                <button className="btn logoperfil"></button>
                            </Link>
                        </div>
                        <div className="col-xs-2">
                        </div>
                    </div>
                </footer>
            </div>
    	);
    }

    handleClick(){
        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});
    }

}

Perfil.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.perfil;
}

export default connect(mapStateToProps)(Perfil);
