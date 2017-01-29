import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ListComponent from '../components/List';
import {fetchLists, postLists, fetchFamilyUsers} from '../actions';

import { each } from 'lodash';

class List extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleclickicon = this.handleclickicon.bind(this);
        this.handleclickuser = this.handleclickuser.bind(this);
        this._submit = this._submit.bind(this);

        var bodyScroll = document.getElementById("body");
        bodyScroll.className = "";

        this.state = {
            showHideSidenav: 'hidden',
            showModal: false,
            showpanel: false,
            color: null,
            ccolor: null,
            userid: null,
            nameicon: null,
            cname: null,
            iconid: null,
            msg: this.props.msg,
            name: null,
            user: null,
            icons:null,
            data:this.props.data,
            check: {0: "trabalho"},
            icon: [{name: "trabalho", id: 0, classname: "gicontrabalho", state: "checked"}, {name: "natal", id: 1, classname: "iconnatal", state: "unchecked"}, {name: "ovo", id: 2,classname: "iconovo", state: "unchecked"}, {name: "ferias", id: 3,classname: "iconferias", state: "unchecked"}, {name: "prenda", id: 4,classname: "iconprenda", state: "unchecked"}],
            
        }
    }

     componentDidMount() {
       // console.log('componentdidMount');
        const {dispatch} = this.props;
        dispatch(fetchLists());
        dispatch(fetchFamilyUsers(1));
    }

     componentWillUnMount() {
       // console.log('componentdidMount');
        this.setState({showModal: false});
    }

    render() {
        var showNav;
        var showmodal;
        console.log(this.state.msg);
       if(this.state.msg === 'OK')
       {
       // console.log("ok");
         
          setTimeout(() => {this.setState({showModal: false, msg: this.props.msg, color: null, ccolor: null, userid:null, cname:null, nameicon:null, iconid:null,check: {0: "trabalho"}, name:null, user:null, data:this.props.data})}, 500)
       }
      if(this.state.msg === 'NOK')
       {

            var data = this.state.data;
             console.log(this.state.msg, data);
            if(data.length === 2)
            {
              this.state.name = data[0];
              this.state.user = data[1];
            }
            else{
                 if(data[0].indexOf("users") !== -1){
                  this.state.name = null;
                  this.state.user = data[0];
                 }
                 if(data[0].indexOf("name") !== -1){
                  this.state.name = data[0];
                  this.state.user = null;
                 }
           }
           this.state.msg = null;
           this.state.data = null;
       }


        if(this.state.showHideSidenav === 'hidden')
        {
            showNav = <button type="button" className="btn btn-list" aria-label="Left Align" onClick={this.handleClick}>
                            <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                        </button>;
        }
        else {
             showNav =
            <div className="modal">
              <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                <ul className="nav sidebar-nav">
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
                  <li className="dropdown">
                    <div className="row menu-lat">
                      <div className="col-xs-2">
                        <input type="button" className="btn btn-smlist" />
                      </div>
                      <div className="col-xs-10 hamburguer">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.handleClick}><h3><b>Lista de Compras</b></h3></a>
                        <li className="col-xs-12 dropdown">
                          <div className="dropownsize font-medium" onClick={this.handleModal}><b>Nova Lista</b></div>
                        </li>
                      </div>
                    </div>
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
                    <Link to={`definition`}>
                    <div className="row menu-lat">
                      <div className="col-xs-2">
                        <input type="button" className="btn btn-smdef" />
                      </div>
                      <div className="col-xs-10 hamburguer">
                        <h3><b>Definições</b></h3>
                      </div>
                    </div>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>;

        }

        if(this.state.showModal === true)
        {
          //USERS
            var userslists=[];
            var family = this.props.users[1];
            console.log(family, 'tamanho usersfamily');

          //foreach para os users de uma familia
             var usercolor;
             var className = {};
             var colorstate = {};
             var ccolor = {};
             var color = {};
             var userid = {};
             each(family, (user, key) => {
                usercolor = 'user'+ user.color;
                ccolor[key] = usercolor;
                color[key] = false;
                userid[key] = user.id;

                if(this.state.ccolor === null)
                {
                  className = ccolor;
                }
                else{
                   className = this.state.ccolor;
                }

                if(this.state.color === null)
                {
                  colorstate = color;
                }
                else {
                  colorstate = this.state.color;
                }
               userslists.push(<div key ={key} className='display'>
                                <div className="cc-selector">
                                  <input id={usercolor} type="radio" name={usercolor} ref={usercolor} value={user.id} defaultChecked={user.color}/>
                                  <label className={className[key]} htmlFor={usercolor} onClick={this.handleclickuser.bind(this, key, user.color)}></label>    
                                </div>
                              </div>);
            });
            this.state.ccolor = className;
            this.state.color = colorstate;
            this.state.userid = userid;
          //FINAL USERS
          //ICONS
          var iconlists=[];
          var icon = this.state.icon;

          var iconname;
          var cname = {};
          var nameicon = {};
          var iconid = {};
          var classIcon = {};
          var iconstate = {};
          each(icon, (icon, key) => {
                iconname = 'icon'+ icon.name;
                cname[key] = icon.classname;
                nameicon[key] = icon.state;
                iconid[key] = icon.name;

                if(this.state.cname === null)
                {
                  classIcon = cname;
                }
                else{
                   classIcon = this.state.cname;
                }

                if(this.state.nameicon === null)
                {
                  iconstate = nameicon;
                }
                else {
                  iconstate = this.state.nameicon;
                }
               // console.log(classIcon, 'icon');
               iconlists.push(<div key ={key} className='display'>
                                <div className="cc-selector">
                                  <input id={iconname} type="radio" name={iconname} ref={iconname} value={iconname} defaultChecked={icon.name}/>
                                  <label className={classIcon[key]} htmlFor={iconname} onClick={this.handleclickicon.bind(this, key, icon.name)}></label>    
                                </div>
                              </div>);
            });
          this.state.cname = classIcon;
          this.state.nameicon = iconstate;
          this.state.iconid = iconstate;
          this.state.icons = iconid;
           // console.log(this.state.nameicon, this.state.iconid,this.state.icons, 'listas de checked')
          //FINAL ICONS
            showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleModal}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Nova Lista</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submit}  encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-edit"></button>
                                        </div>
                                        <div className="col-xs-10">
                                             <h4 >Nome da Lista</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                            <div className="validation">{this.state.name}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-people"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Convidar pessoas</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-10 display">
                                          {userslists}
                                        </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-xs-12">
                                            <div className="validation">{this.state.user}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-invit"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Alterar Icon</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-10 display">
                                          {iconlists}
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
       
        return (
            <div>
                 <Link to={`/`}><header className="headerfirst ">
                   <div className="container">
                       <div className="title">eva</div>
                    </div>
                </header></Link>
                <header id="header" className="header header-list">
                    <div className="container">
                    <div className="menu-title font-large">Lista de Compras</div>
                        {showNav}
                        {showmodal}
                    </div>
                </header>
                <section>
                        <ListComponent lists={this.props.lists.lists} users={this.props.users} />
                </section>        
                <footer className="footerfixed navbar fixed-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-10">
                                <div className="titlefooter">Environmental Virtual Assistant</div>
                            </div>
                            <div className="col-xs-2">
                                <button className="btn btn-newlist" onClick={this.handleModal}></button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    	);
    }

    handleclickuser(key, color, event) {
       event.preventDefault();

        var css = (this.state.color[key] === false) ? true : false;
        var usercolor = (this.state.ccolor[key] === 'user'+color) ? 'guser'+color : 'user'+color;
      
        var xcolor = {};
        xcolor[key] = css;

        var x = {};
        x[key] = usercolor;

        var tempcolor = Object.assign(this.state.color, xcolor);
        var temp = Object.assign(this.state.ccolor, x);

        this.setState({color:tempcolor, ccolor: temp});
    }

    handleclickicon(key, name, event){
      event.preventDefault();
     // console.log(key, name, 'handleclickicon');

       var css = (this.state.nameicon[key] === "unchecked") ? "checked" : "unchecked";

       var icon = this.state.nameicon;
       var iconstate = {};
       each(icon, (icon, key) => {
           iconstate[key] = "unchecked";
       });

       var xname = {};
       xname[key] = css;

       var tempname = Object.assign(iconstate, xname);
       //console.log(tempname, 'checked');

       var iconcolor = (this.state.cname[key] === 'icon'+name) ? 'gicon'+name : 'icon'+name;
       var iconname = this.state.cname;
       var iconcn = {};
       each(iconname, (icon, key) => {
           if(icon.indexOf("g") === -1)
           {
              iconcn[key] = icon;
           }
           else{
              var x = icon.split("g");
              iconcn[key] = x[1];
           }
       });
       var x = {};
       x[key] = iconcolor;

       var temp = Object.assign(iconcn, x);

       //console.log(temp, 'cor do icon');

       this.setState({nameicon: tempname, cname: temp});

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

    handleModal(){
        var bodyScroll = document.getElementById("body");

        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css, showHideSidenav: 'hidden', checked1: false, checked2: false, checked3: false, checked4: false, checked5: false, checked6: false,  checkedu1: false, checkedu2: false, checkedu3: false, checkedu4: false });

        if(this.state.showModal == false){
            setTimeout(() => {
                bodyScroll.classList.add("body-stop-scroll");
            }, 500);
        } else{
            bodyScroll.className = "";
        }
    }

    _submit(event) {
        event.preventDefault();
        var ref;
        var users; //{name:this.state.family.name, color:"red"};
        var listusers = [];
        var iconc;
        //console.log(this.state.checked1, this.state.checked2, this.state.checked3, this.state.checked4, this.state.checked5, this.state.checked6, 'icons');

        var iconname = this.state.nameicon;
        var iconid = this.state.iconid;

        each(iconname, (icon, key) => {
           if(icon === "checked") {
              iconc = this.state.icons[key];
           }
        });

        var color = this.state.color;
        var userid = this.state.userid;

        each(color, (color, key) => {
           if(color) {
              users = userid[key];
              listusers.push(users);
           }
        });
    
        let user = [];
        user = listusers;

        var FormData = require('form-data');
        const form = new FormData();
        form.append('name', this.refs.name.value);
        form.append('icon', iconc);
        form.append('users', user);
        form.append('created_by', 2);
        const {dispatch} = this.props;
        dispatch(postLists(form));
        setTimeout(() => {this.setState({msg: this.props.msg, data:this.props.data})}, 500);

    }
}

const mapStateToProps = (state, ownProps) => {
    //console.info('container List mapStateToProps', state, ownProps);
    console.log(state.lists.dataadd, 'fgdfxgsdfgdgf users');
    return {lists: state.lists, usersfamily: state.userslist, msg: state.lists.msgadd, data: state.lists.dataadd, users:state.userslist.userslist};
}

export default connect(mapStateToProps)(List);
