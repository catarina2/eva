import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


import {fetchLists, fetchFamilyUsers, fetchFamily, editUsers} from '../actions';

class Def extends Component {
    

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleuserpink = this.handleuserpink.bind(this);
        this.handleuserblue = this.handleuserblue.bind(this);
        this.handleuserred = this.handleuserred.bind(this);
        this.handleusergreen = this.handleusergreen.bind(this);
        
        this._submitedit = this._submitedit.bind(this);
        
        this.state = {
            showHideSidenav: 'hidden',
            user: {name: null, family_id: null, birthday:null, color:null, email: null, password: null}, 
            showEdit: 'hidden', 
            checked1:false,
            checked2:false,
            checked3:false,
            checked4:false, 
            pink: "userpink",
            blue: "userblue",
            red: "userred",
            green: "usergreen", 
            msg: null
        }
    }

    componentDidMount() {
       // console.log('componentdidMount');
        const {dispatch} = this.props;
        dispatch(fetchLists());
        dispatch(fetchFamilyUsers(2));
        dispatch(fetchFamily(2));
    }

    render() {
        //console.log('Definições de perfil');
        if(this.state.msg)
        {
            this.state.msg = null;
            this.state.showEdit = "hidden";
        }

        if(this.state.showEdit === 'show')
        {
                console.log('Definições de perfil');
                var showedit;
                showedit = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content  modal-contentperfil">
                            <div className="modal-header modal-headerperfil">
                                <button className="btn btn-default" onClick={this.handleEdit}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Editar Perfil</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submitedit}  encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-editname"></button>
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
                                            <button type="button" className="btn btn-editbirthday"></button>
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
                                            <button type="button" className="btn btn-editcolor"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Cor do Avatar</h4>
                                        </div>
                                    </div>
                                    <div className="row cc-selector display">
                                        <div className="col-xs-2 iconperfil">
                                                 <input id="pink" type="radio" name="pink" ref="pink" value="pink" checked={this.state.checked1}/>
                                                 <label className={this.state.pink} htmlFor="pink"  onClick={this.handleuserpink}></label>
                                        </div>
                                        <div className="col-xs-2 iconperfil">
                                                 <input id="red" type="radio" name="red" ref="red" value="red" checked={this.state.checked2}/>
                                                 <label className={this.state.red} htmlFor="red"  onClick={this.handleuserred}></label>
                                        </div>
                                        <div className="col-xs-2 iconperfil">
                                                 <input id="green" type="radio" name="green" ref="green" value="green" checked={this.state.checked3}/>
                                                 <label className={this.state.green} htmlFor="green"  onClick={this.handleusergreen}></label>
                                        </div>
                                        <div className="col-xs-2 iconperfil">
                                                 <input id="blue" type="radio" name="blue" ref="blue" value="blue" checked={this.state.checked4}/>
                                                 <label className={this.state.blue} htmlFor="blue"  onClick={this.handleuserblue}></label>
                                        </div>
                                    </div>
                                   
                                     <div className="modal-footer">
                                        <div className="row">
                                            <div className="col-xs-2">
                                            </div>
                                            <div className="col-xs-8">
                                                <Link to={`/`}>
                                                    <button className="btn logolistsmallperfil"></button>
                                                </Link>
                                            </div>
                                            <div className="col-xs-2">
                                                <button type="submit" className="btn submitperfil"></button>
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
                                    <Link to={`/calendar`}>
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
                                <Link to={`/lists`}>
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
        var coloruser;
        if(user)
        {
            this.state.user = user[3];

            if(this.state.user.color === 'pink') {coloruser = <label className="userpink"></label>};
            if(this.state.user.color === 'blue') {coloruser = <label className="userblue"></label>};
            if(this.state.user.color === 'green') {coloruser = <label className="usergreen"></label>};
            if(this.state.user.color === 'red') {coloruser = <label className="userred"></label>};

        }

        return (
             <div>
                 <Link to={`/`}><header className="headerfirst ">
                   <div className="container">
                       <div className="title">eva</div>
                    </div>
                </header></Link>
                <header className="header header-perfil">
                    <div className="container">
                    <Link to={`definition`}>
                        <div className="menu-title font-large">Definições</div>
                    </Link>
                             <div className="edit-container">
                                {showNav}
                            </div>
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
                        <div className="modal-body scrollperfil">
                        <div className="row">
                                    <div className="col-xs-6">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4 className="specification sizename">{this.state.user.name}</h4>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <input type="button" ref="photo" className="btn btn-photoperfilpink"></input>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-familyperfil"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Familia</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <label className="labelperfil">{this.props.family}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-birthdayperfil"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Data de Nascimento</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <label className="labelperfil">{this.state.user.birthday}</label>
                                        </div>
                                    </div>
                    </div>
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
        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});
    }

    handleuserpink(event) {
        event.preventDefault();
        var css = (this.state.checked1 === false) ? true : false;
        var color = (this.state.pink === "userpink") ? "guserpink" : "userpink";
        this.setState({checked1:css, checked2:false, checked3:false, checked4:false, pink: color, red:"userred", green:"usergreen", blue:"userblue"});
    }

    handleuserred(event) {
        event.preventDefault();
        var css = (this.state.checked2 === false) ? true : false;
        var color = (this.state.red === "userred") ? "guserred" : "userred";
        this.setState({checked2:css, checked1:false, checked3:false, checked4:false, red: color, pink: "userpink", green:"usergreen", blue:"userblue"});
    }

    handleusergreen(event) {
        event.preventDefault();
        var css = (this.state.checked3 === false) ? true : false;
        var color = (this.state.green === "usergreen") ? "gusergreen" : "usergreen";
        this.setState({checked3:css, checked2:false, checked1:false, checked4:false, green: color, pink: "userpink", red:"userred", blue:"userblue"});
    }

    handleuserblue(event) {
        event.preventDefault();
        var css = (this.state.checked4 === false) ? true : false;
        var color = (this.state.blue === "userblue") ? "guserblue" : "userblue";
        this.setState({checked4:css, checked2:false, checked3:false, checked1:false, blue: color, pink: "userpink", red:"userred", green:"usergreen"});
    }

    handleEdit(){
        console.log('click no edit');
         var css = (this.state.showEdit === "hidden") ? "show" : "hidden";
        console.log(css);
        this.setState({showEdit:css});
    }

    _submitedit(event) {
        event.preventDefault();
        
        var color;
        if(this.state.checked1) {color = "pink";}
        else if(this.state.checked2) {color = "red";}
        else if(this.state.checked3) {color = "green";}
        else if(this.state.checked4) {color = "blue";}
        let obj = {};

        obj['name'] = this.refs.name.value;
        obj['birthday'] = this.refs.birthday.value;
        obj['color'] = color;
        obj['email'] = this.state.user.email;
        obj['family_id'] = this.state.user.family_id;
        obj['password'] = 'xpto';

        console.log(this.state.user.id, obj, 'edição perfil');


        const {dispatch} = this.props;
        dispatch(editUsers(this.state.user.id, obj));
        setTimeout(() => {this.setState({msg: this.props.msg})}, 500);
    }


}

const mapStateToProps = (state, ownProps) => {
    console.info('container DEF mapStateToProps', state, ownProps );
    console.log(state.userslist.users, 'fgdfxgsdfgdgf users');
    return {users:state.userslist.users, msg:state.userslist.msg, family:state.userslist.family};
}

export default connect(mapStateToProps)(Def);
