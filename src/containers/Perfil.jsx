import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import PerfilC from '../components/Perfil'

class Perfil extends Component {
     constructor(props) {
        super(props);
        
        this.state = {
            perfil: [{name:'Perfil', icon: 'perfil'}, {name:'Segurança', icon: 'seg'}, {name:'Notificações', icon: 'notif'}, {name:'Contas', icon: 'account'}, {name:'Sons', icon: 'sounds'}, {name:'Widgets', icon: 'widgets'}, {name:'Idioma', icon: 'lang'}, {name:'Acessibilidade', icon: 'access'}, {name:'Versão', icon: 'version'}]
        }
    }

    render() {
       console.log(this.state.perfil);
        return (
            <div>
                <header className="header-perfil">
                    <div className="container">
                    <h2>Definições</h2>
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
                    <div className="container">
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
                    </div>
                </footer>
            </div>
    	);
    }

}

Perfil.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.contacts;
}

export default connect(mapStateToProps)(Perfil);
