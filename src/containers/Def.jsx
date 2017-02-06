import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import { each } from 'lodash';


import {fetchUserLists, fetchFamilyUsers, fetchFamily, editUsers} from '../actions';

class Def extends Component {
    

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleclickcolor = this.handleclickcolor.bind(this);
        this.handleclickavatar = this.handleclickavatar.bind(this);
        
        
        this._submitedit = this._submitedit.bind(this);
        
        this.state = {
            showHideSidenav: 'hidden',
            user: {name: null, family_id: null, birthday:null, color:null, avatar:null, email: null, password: null}, 
            showEdit: 'hidden',
            msg: null,
            userlogged: 'undefined',
            color:[{color: "blue", classname: "blue"}, {color: "pink",  classname: "pink"}, {color: "green",  classname: "green"}, {color: "red",  classname: "red"}, {color: "yellow",  classname: "yellow"}, {color: "orange",  classname: "orange"}],
            avatar:[{avatar: "1", classname: "smallavatar1", color: "blue"}, {avatar: "2", classname: "smallavatar2", color: "blue"}, {avatar: "3", classname: "smallavatar3", color: "blue"}, {avatar: "4", classname: "smallavatar4", color: "blue"}, {avatar: "5", classname: "smallavatar5", color: "blue"}, {avatar: "6", classname: "smallavatar6", color: "blue"}]
        }
    }

    componentDidMount() {
       // console.log('componentdidMount');
        var token = window.localStorage.getItem("UserLoggedToken");
        var family = window.localStorage.getItem("UserLoggedFamily_id");
        var id = window.localStorage.getItem("UserLoggedId");
        const {dispatch} = this.props;
        dispatch(fetchUserLists(id, token));
        dispatch(fetchFamilyUsers(family, token));
        dispatch(fetchFamily(family, token));
    }

    render() {
        //console.log('Definições de perfil');
        if(this.state.msg)
        {
            var bodyScroll = document.getElementById("body");
            bodyScroll.classList.remove("body-stop-scroll");
            this.state.msg = null;
            this.state.showEdit = "hidden";
            setTimeout(() => {
            this.state.color = [{color: "blue", classname: "blue"}, {color: "pink",  classname: "pink"}, {color: "green",  classname: "green"}, {color: "red",  classname: "red"}, {color: "yellow",  classname: "yellow"}, {color: "orange",  classname: "orange"}];
            this.state.avatar = [{avatar: "1", classname: "smallavatar1", color: "blue"}, {avatar: "2", classname: "smallavatar2", color: "blue"}, {avatar: "3", classname: "smallavatar3", color: "blue"}, {avatar: "4", classname: "smallavatar4", color: "blue"}, {avatar: "5", classname: "smallavatar5", color: "blue"}, {avatar: "6", classname: "smallavatar6", color: "blue"}];
            }, 1000);
        }

        if(this.state.showEdit === 'show')
        {
                  var colorlist=[];
                  var color = this.state.color;
                //  console.log(color, 'cor dos users')
                  var userlogged = (this.state.userlogged === "undefined") ? "undefined" : this.state.userlogged;
                  var x;
                  each(color, (colorxx, key) => {
                    if(userlogged.color === colorxx.color) { 
                        var xcolor = {};
                        xcolor["color"] = colorxx.color;
                        xcolor["classname"] = "g"+colorxx.classname;

                        var tcolor = {};
                        tcolor[key] = xcolor;
                        Object.assign(this.state.color, tcolor);
                        return false;
                    }
                  });
                  
                  each(color, (colorxx, key) => {
                       var colorlosange ="losangecolor"+" "+colorxx.classname;

                       colorlist.push(<div key ={key} className='displayavatares'>
                                        <div className="cc-selectorperfil">
                                        <div className={colorlosange} onClick={this.handleclickcolor.bind(this, key, colorxx.color)}>
                                            <input id={colorxx.color} type="radio" name={colorxx.color} ref={colorxx.color} value={colorxx.color} defaultChecked={coloruser}/>
                                        </div>  
                                        </div>
                                      </div>);
                    });

                  var avatarlist=[];
                  var avatar = this.state.avatar;
                  var userloggedavatar = (this.state.userlogged === "undefined") ? "undefined" : this.state.userlogged;
                  var x;
                  each(avatar, (avatar, key) => {
                    if(userlogged.avatar === avatar.avatar) { 
                        var xcolor = {};
                        xcolor["avatar"] = avatar.avatar;
                        xcolor["classname"] = avatar.classname;
                        xcolor["color"] = "g"+avatar.color;

                        var tcolor = {};
                        tcolor[key] = xcolor;
                        Object.assign(this.state.avatar, tcolor);
                        return false;
                    }
                  });
                  each(avatar, (avatar, key) => {
                        var color = avatar.color;
                        var colorlosange ="losangecolor"+" "+color;
                        var classname ="btn-"+avatar.classname;
                       avatarlist.push(<div key ={key} className='displayavatares' onClick={this.handleclickavatar.bind(this, key, avatar.avatar, color)}>
                                        <div className="cc-selectorperfil">
                                        <div className={colorlosange}>
                                           <div className="loscolor"> <button ref="photo" className={classname}></button></div>
                                        </div>
                                        </div>
                                      </div>);
                    });

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
                                     <div className="row">
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-10 displayavatares">
                                          {colorlist}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-editcolor"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Avatar</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-10 displayavatares">
                                          {avatarlist}
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
        var coloruser;
        if(user)
        {
            var userId = window.localStorage.getItem("UserLoggedId");
            var keyUser;
            
            each(user, (user, key) =>
            {
                if(user.id == userId){
                     keyUser = key};
            });

            this.state.user = user[keyUser];
            this.state.userlogged = user[keyUser];
            var color ="losangeavatar"+" "+this.state.user.color;
            var avatar = "btn btn-avatar"+ this.state.user.avatar;
        }

        return (
             <div>
                 <Link to={`/callback`}><header className="headerfirst ">
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
                                    <div className={color}> <div className="losavatar"> <input type="button" ref="photo" className={avatar}></input></div></div> 
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

    handleclickcolor(key,color,event) {
        event.preventDefault();
        var color = (this.state.color[key].classname === color) ? "g"+color : color;

        var listcolor = [];
        each(this.state.color, (color, key) => {
            if(color.classname === "g"+color.color) {
                var colorx= color.color;
                var t = {};
                t["color"] = color.color
                t["classname"] = color.color;
                
                var c = {};
                c[key] = t;
                listcolor.push(t);
            }
            else{
                var c = {};
                c[key] = color;
                listcolor.push(color);
            }
        });
        var x = {};
        x["color"] = this.state.color[key].color
        x["classname"] = color;

        var xcolor ={};
        xcolor[key] = x;
        var tempcolor = Object.assign(listcolor, xcolor);


        this.setState({color:tempcolor, userlogged: "undefined"});
    }

    handleclickavatar(key, avatar, color, event){
        event.preventDefault();
       // console.log(this.state.avatar, this.state.avatar[key].avatar, avatar)
        var avatar = (this.state.avatar[key].color === "blue") ? "g"+color : "blue";

        var listavatar = [];
        each(this.state.avatar, (avatar, key) => {
            if(avatar.color === "gblue") {
                var t = {};
                t["avatar"] = avatar.avatar
                t["classname"] = avatar.classname;
                t["color"] = "blue";
                
                listavatar.push(t);
            }
            else{
                listavatar.push(avatar);
            }
        });

        var x = {};
        x["avatar"] = this.state.avatar[key].avatar
        x["classname"] = this.state.avatar[key].classname;
        x["color"] = avatar;

        var xavatar ={};
        xavatar[key] = x;

        var tempavatar = Object.assign(listavatar, xavatar);

        this.setState({avatar:tempavatar, userlogged:"undefined"});
    }

    handleEdit(){
       // console.log('click no edit');
       var bodyScroll = document.getElementById("body");
       if(this.state.showEdit === "hidden") {
        bodyScroll.classList.add("body-stop-scroll");
        }
        else{
             bodyScroll.classList.remove("body-stop-scroll");
        }

        var css = (this.state.showEdit === "hidden") ? "show" : "hidden";
        //console.log(css);
        this.setState({showEdit:css});
    }

    _submitedit(event) {
        event.preventDefault();
        var color = this.state.color;
        var coloruser;
        each(color, (color, key) => {
            if(color.color !== color.classname)
                coloruser = color.color;
        });


        var avatar = this.state.avatar;
        //console.log(this.state.avatar, 'avatares submit edit')
        var avataruser;
        each(avatar, (avatar, key) => {
            if(avatar.color === "gblue")
                avataruser = avatar.avatar;
        });

        let obj = {};

        obj['name'] = this.refs.name.value;
        obj['birthday'] = this.refs.birthday.value;
        obj['color'] = coloruser;
        obj['avatar'] = avataruser;
        obj['email'] = this.state.user.email;
        obj['family_id'] = this.state.user.family_id;
        obj['password'] = 'xpto';


        var token = window.localStorage.getItem("UserLoggedToken");
        const {dispatch} = this.props;
        dispatch(editUsers(this.state.user.id, obj, token));
        setTimeout(() => {this.setState({msg: this.props.msg})}, 500);
    }


}

const mapStateToProps = (state, ownProps) => {
    //console.info('container DEF mapStateToProps', state, ownProps );
   // console.log(state.userslist.users, 'fgdfxgsdfgdgf users');
    return {users:state.userslist.users, msg:state.userslist.msg, family:state.userslist.family};
}

export default connect(mapStateToProps)(Def);
