import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchLists, fetchFamilyUsers, editUsers} from '../actions';

class Def extends Component {
    componentDidMount() {
       // console.log('componentdidMount');
        const {dispatch} = this.props;
        dispatch(fetchLists());
        dispatch(fetchFamilyUsers(2));
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this._submitedit = this._submitedit.bind(this);
        
        this.state = {
            showHideSidenav: 'hidden',
            user: {name: null, family_id: null, birthday:null, color:null, email: null, password: null}, 
            showEdit: 'hidden'
        }
    }

    render() {
        //console.log('Definições de perfil');
        if(this.state.showEdit === 'show')
        {
                console.log('Definições de perfil');
                var showedit;
                showedit = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleEdit}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Editar Perfil</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submitedit}  encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-edit"></button>
                                        </div>
                                        <div className="col-xs-10">
                                             <h4 >Nome do Utilizador</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" defaultValue={this.state.user.name}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-people"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Data de Nascimento</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="birthday" name="name" defaultValue={this.state.user.birthday}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-invit"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Cor do Avatar</h4>
                                        </div>
                                    </div>
                                   
                                     <div className="modal-footer">
                                        <div className="row">
                                            <div className="col-xs-2">
                                            </div>
                                            <div className="col-xs-8">
                                                <Link to={`/`}>
                                                    <button className="btn logolistsmall"></button>
                                                </Link>
                                            </div>
                                            <div className="col-xs-2">
                                                <button type="submit" className="btn submit"></button>
                                            </div>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
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
                                            <h3><b>Lista de Compras</b></h3>
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
        var user = this.props.users;
        console.log(user);
        if(user)
        {
            this.state.user = user[3];
        }
        return (
             <div>
                <header className="header header-perfil">
                    <div className="container">
                        <div className="menu-title font-large">Definições</div>
                            {showNav}
                            {showedit}
                    </div>
                </header>
                <section  className="section-perfil">
                     <div className="container">
                        <div className="menu-perfil"><b>Informação Pessoal</b>
                         <div className="edit-container">
                            <button className="btn btn-editperfil" onClick={this.handleEdit}><span
                                className="glyphicon glyphicon-edit gperfil"></span></button>
                        </div>
                        </div>
                        <div className="modal-body">
                        <div className="row">
                                    <div className="col-xs-6">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4 className="specification">{this.state.user.name}</h4>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <input type="button" ref="photo" className="btn btn-photoperfil"></input>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Familia</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <label >{this.state.user.family_id}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Data de Nascimento</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <label>{this.state.user.birthday}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Cor do Avatar</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <label>{this.state.user.color}</label>
                                        </div>
                                    </div>
                    </div>
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

    handleEdit(){
        console.log('click no edit');
         var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        console.log(css);
        this.setState({showEdit:css});
    }

    _submitedit(event) {
        event.preventDefault();
        
        let obj = {};

        obj['name'] = this.refs.name.value;
        obj['birthday'] = this.refs.birthday.value;
        obj['color'] = 'green';
        obj['email'] = this.state.user.email;
        obj['family_id'] = this.state.user.family_id;
        obj['password'] = 'xpto';

        console.log(this.state.user.id, obj, 'edição perfil');


        const {dispatch} = this.props;
        dispatch(editUsers(this.state.user.id, obj));
    }


}

const mapStateToProps = (state, ownProps) => {
    console.info('container DEF mapStateToProps', state, ownProps );
    console.log(state.userslist.users, 'fgdfxgsdfgdgf users');
    return {users:state.userslist.users};
}

export default connect(mapStateToProps)(Def);
