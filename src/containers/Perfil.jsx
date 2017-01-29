import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import PerfilC from '../components/Perfil'

class Perfil extends Component {
     constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

         var bodyScroll = document.getElementById("body");
         bodyScroll.className = "";

        this.state = {
            showHideSidenav: 'hidden', 
            perfil: [{name:'Informação Pessoal', icon: 'perfil'}, {name:'Segurança', icon: 'seg'}, {name:'Notificações', icon: 'notif'}, {name:'Contas', icon: 'account'}, {name:'Sons', icon: 'sounds'}, {name:'Widgets', icon: 'widgets'}, {name:'Idioma', icon: 'lang'}, {name:'Acessibilidade', icon: 'access'}, {name:'Versão', icon: 'version'}]
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
            showNav =
          <div className="modal">
            <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper-perfil" role="navigation">
              <ul className="nav nav-perfil sidebar-nav">
                <li className="sidebar-brand">
                  <Link to={`calendar`}>
                  <div className="row menu-lat">
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
                  <Link to={`lists`}>
                  <div className="row menu-lat">
                    <div className="col-xs-2">
                      <input type="button" className="btn btn-smlist" />
                    </div>
                    <div className="col-xs-10 hamburguer">
                      <h3><b>Lista de Compras</b></h3>
                    </div>
                  </div>
                  </Link>
                </li>
                <li>
                  <Link to={`mirror`}>
                  <div className="row menu-lat">
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
                  <div className="row menu-lat" onClick={this.handleClick}>
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
       // console.log(this.props.children, "filhos");
        return (
            <div>
                 <Link to={`/`}><header className="headerfirst ">
                   <div className="container">
                       <div className="title">eva</div>
                    </div>
                </header></Link>
                 <header className="header header-perfil">
                    <div className="container">
                        <div className="menu-title font-large">Definições</div>
                             <div className="edit-container">
                                {showNav}
                            </div>
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
                <footer className="footerfixedperfil navbar fixed-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-10">
                                <div className="titlefooter">Environmental Virtual Assistant</div>
                            </div>
                            <div className="col-xs-2">
                            </div>
                        </div>
                    </div>
                </footer>
                
            </div>
    	);
    }

    handleClick(){

        var bodyScroll = document.getElementById("body");
        if(this.state.showHideSidenav == "hidden"){
            bodyScroll.classList.add("body-stop-scroll");
        } else{
            bodyScroll.className = "";

        }

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
