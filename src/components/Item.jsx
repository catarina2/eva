import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produtos from './Produtos';
import User from './User';
import {Link} from 'react-router';
import { each } from 'lodash';

import {fetchListUsers} from '../actions';
import {fetchListProducts, deleteLists, editLists} from '../actions';

class Item extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleiconclick1 = this.handleiconclick1.bind(this);
        this.handleiconclick2 = this.handleiconclick2.bind(this);
        this.handleiconclick3 = this.handleiconclick3.bind(this);
        this.handleiconclick4 = this.handleiconclick4.bind(this);
        this.handleiconclick5 = this.handleiconclick5.bind(this);
        this.handleiconclick6 = this.handleiconclick6.bind(this);
        this.handleclickuser = this.handleclickuser.bind(this);
        this.handleclickicon = this.handleclickicon.bind(this);
        this.confirmdelete = this.confirmdelete.bind(this);
        this.noconfirm = this.noconfirm.bind(this);
        this._submit = this._submit.bind(this);
        this._submitEdit = this._submitEdit.bind(this);

        this.state = {
            showpanel: false,
            produtos: null,
            showModalEdit: false,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
            confirmdelete: false,
            msgdelete: null,
            msgedit: null,
            pink: false,
            blue: false,
            green: false,
            red: false,
            yellow:false,
            cpink: 'userpink',
            cblue: 'userblue',
            cgreen: 'usergreen',
            cred: 'userred',
            cyellow: 'useryellow',
            color: null,
            ccolor: null,
            userid: null,
            nameicon: null,
            cname: null,
            iconid: null,
            icons:null,
            check: {0: "trabalho"},
            icon: [{name: "trabalho", id: 0, classname: "gicontrabalho", state: "checked"}, {name: "natal", id: 1, classname: "iconnatal", state: "unchecked"}, {name: "ovo", id: 2,classname: "iconovo", state: "unchecked"}, {name: "ferias", id: 3,classname: "iconferias", state: "unchecked"}, {name: "prenda", id: 4,classname: "iconprenda", state: "unchecked"}],
            
        }
    }

    componentDidMount() {
        //console.log(this.props.item, 'componentDidMount');
        const {dispatch} = this.props;
        dispatch(fetchListUsers(this.props.list.id));
        dispatch(fetchListProducts(this.props.list.id));
    }

    render() {
        //console.log(this.props, 'propriedades Item')
        var list = this.props.list;
        var panel = null;


        // console.log(this.state.msg, this.props.lists, 'mensagem de apagar');
        if (this.state.msgdelete === "OK") {
           
            setTimeout(() => {this.setState({confirmdelete: false, msgdelete: null, showModalEdit: false})}, 500);
        }

        if (this.state.msgedit === "OK") {
            this.state.showModalEdit = false;
            this.state.msgedit = null;
            //setTimeout(() => {this.setState({confirmdelete: false, msg: null})}, 500);
        }

        if (this.state.showpanel === true) {
            panel = <Produtos id={list.id}/>;
        }
        var icon;
        if (list.icon === "casa") {
            icon = <button className="btn casa list-icon"></button>;
        }
        else if (list.icon === "trabalho") {
            icon = <button className="btn trabalho list-icon"></button>;
        }
        else if (list.icon === "natal") {
            icon = <button className="btn natal list-icon"></button>;
        }
        else if (list.icon === "prenda") {
            icon = <button className="btn prenda list-icon"></button>;
        }
        else if (list.icon === "ovo") {
            icon = <button className="btn ovo list-icon"></button>;
        }
        else if (list.icon === "ferias") {
            icon = <button className="btn ferias list-icon"></button>;
        }

        var showedit;
        //console.log(this.state.showModalEdit);

        if (this.state.showModalEdit) {
             var userslists=[];
            
            var family = this.props.users[1];
            console.log(family, 'usersfamily');
            //USERS
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
            //final USERS
            //ICONS
            var iconlists=[];

            var iconname;
              var cname = {};
              var nameicon = {};
              var iconid = {};
              var classIcon = {};
              var iconstate = {};
              var iconlist = this.state.icon;
              each(iconlist, (icon, key) => {
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
            
            showedit = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleEdit}><span
                                    className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>{list.name}</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submitEdit} encType="multipart/form-data">
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
                                            <input type="text" className="form-control" ref="name" name="name"
                                                   defaultValue={list.name}/>
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
                                            <div className="col-xs-2 display-icons">
                                                <button className="btn btn-delete" onClick={this.handleDelete}><span
                                                    className="glyphicon glyphicon-trash glist-trash"></span></button>
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

        if (this.state.confirmdelete) {
            var showconfirm;
            showconfirm = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"><b>Lista {list.name}</b></h4>
                            </div>
                            <div className="modal-body">
                                <h4>Deseja apagar esta lista?</h4>

                                <div className="modal-footer">
                                    <button className="btn btn-confirm" onClick={this.confirmdelete}>Sim</button>
                                    <button className="btn btn-confirm" onClick={this.noconfirm}>Não</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        var classname, button;
        if(this.props.listkey%2 === 0){classname='panel-heading par'; button="btn btn-delete1 par"}
          else {classname='panel-heading impar'; button="btn btn-delete1 impar"}
        return (
            <div className="panel panel-primary">
                <div className="panelrow">
                    <div className={classname}>
                        {icon}

                            <div className="panel-title" onClick={this.handleClick}>
                                <div className="list font-medium"><b>{list.name}</b></div>
                            </div>
                            <div className="list-info-container">
                                <div className="user-container">
                                    <User id={list.id}/>
                                </div>
                                <div className="edit-container">
                                    <button className={button}onClick={this.handleEdit}><span
                                        className="glyphicon glyphicon-edit glist"></span></button>
                                </div>
                            </div>
                            <div className="clear-container"></div>
                    </div>

                </div>
                {panel}
                {showedit}
                {showconfirm}
            </div>
        );
    }


    handleclickicon(key, name, event){
      event.preventDefault();
      console.log(key, name, 'handleclickicon');

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

     handleclickuser(key, color, event) {
       event.preventDefault();
       console.log(this.props.list)

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

    handleiconclick1(event) {
        event.preventDefault();
        //console.log(this.state.checked1, 'handleiconclick1');
        var css = (this.state.checked1 === false) ? true : false;
        this.setState({
            checked1: css,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false
        });
    }

    handleiconclick2(event) {
        event.preventDefault();
        var css = (this.state.checked2 === false) ? true : false;
        this.setState({
            checked2: css,
            checked1: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false
        });
    }

    handleiconclick3(event) {
        event.preventDefault();
        var css = (this.state.checked3 === false) ? true : false;
        this.setState({
            checked3: css,
            checked2: false,
            checked1: false,
            checked4: false,
            checked5: false,
            checked6: false
        });
    }

    handleiconclick4(event) {
        event.preventDefault();
        var css = (this.state.checked4 === false) ? true : false;
        this.setState({
            checked4: css,
            checked2: false,
            checked3: false,
            checked1: false,
            checked5: false,
            checked6: false
        });
    }

    handleiconclick5(event) {
        event.preventDefault();
        var css = (this.state.checked5 === false) ? true : false;
        this.setState({
            checked5: css,
            checked2: false,
            checked3: false,
            checked4: false,
            checked1: false,
            checked6: false
        });
    }

    handleiconclick6(event) {
        event.preventDefault();
        var css = (this.state.checked6 === false) ? true : false;
        this.setState({
            checked6: css,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked1: false
        });
    }

     handleiconclickpink(event) {
        event.preventDefault();
        console.log(this.state.cpink, 'handleclickuser pink');
        var css = (this.state.pink === false) ? true : false;
        var color = (this.state.cpink === 'userpink') ? 'guserpink' : 'userpink';
        console.log(this.state.cpink, 'handleclickuser pink');
        this.setState({pink:css, cpink: color});
    }
    handleiconclickblue(event) {
        event.preventDefault();
        console.log(this.state.cblue, 'handleclickuser pink');
        //console.log(this.state.pink, this.state.red, this.state.blue, 'handleclickuser blue');
        var css = (this.state.blue === false) ? true : false;
        var color = (this.state.cblue === 'userblue') ? 'guserblue' : 'userblue';
        this.setState({blue:css, cblue: color});
    }
    handleiconclickred(event) {
        event.preventDefault();
        //console.log(this.state.pink, this.state.red, this.state.blue, 'handleclickuser red');
        var css = (this.state.red === false) ? true : false;
        var color = (this.state.cred === 'userred') ? 'guserred' : 'userred';
        this.setState({red:css, cred: color});
    }
    handleiconclickgreen(event) {
        event.preventDefault();
        //console.log(this.state.pink, this.state.red, this.state.blue, 'handleclickuser green');
        var css = (this.state.green === false) ? true : false;
        var color = (this.state.cgreen === 'usergreen') ? 'gusergreen' : 'usergreen';
        this.setState({green:css, cgreen: color});
    }
    handleiconclickyellow(event) {
        event.preventDefault();
        //console.log(this.state.pink, this.state.red, this.state.blue, 'handleclickuser green');
        var css = (this.state.yellow === false) ? true : false;
        var color = (this.state.cyellow === 'useryellow') ? 'guseryellow' : 'useryellow';
        this.setState({yellow:css, cyellow: color});
    }

    handleClick() {
        //console.log('handleClick');
        var css = (this.state.showpanel === false) ? true : false;
        this.setState({showpanel: css});
    }

    handleModal() {
        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal: css});
    }


    handleDelete() {
       // console.log(this.props, 'handleDelete');
        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");

        setTimeout(() => {
            header.classList.add("header-hide");
            bodyScroll.classList.add("body-stop-scroll");
        }, 520);
       this.setState({confirmdelete: true});
    }
    confirmdelete() {

        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");

        header.classList.add("header-hide");
        bodyScroll.classList.add("body-stop-scroll");

        const {dispatch} = this.props;
        dispatch(deleteLists(this.props.list.id));
        setTimeout(() => {this.setState({msgdelete: this.props.msgdelete})}, 500);
    }
    noconfirm() {
        this.setState({confirmdelete: false});
    }
    handleEdit() {
        //console.log(this.props, 'handleEdit');
        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");

        if(this.state.showModalEdit === false){
            header.classList.add("header-hide");
            bodyScroll.classList.add("body-stop-scroll");
        }else{
            header.className = "header header-list";
            bodyScroll.className = "";
        }
        var css = (this.state.showModalEdit === false) ? true : false;
        this.setState({showModalEdit:css});
    }

     _submitEdit(event) {
        event.preventDefault();
        var ref;
        var listusers = [];
       // console.log(this.state, 'icons');
        if(this.state.checked1) ref=this.refs.icon1.value;
        else if(this.state.checked2) ref=this.refs.icon2.value;
        else if(this.state.checked3) ref=this.refs.icon3.value;
        else if(this.state.checked4) ref=this.refs.icon4.value;
        else if(this.state.checked5) ref=this.refs.icon5.value;
        else if(this.state.checked6) ref=this.refs.icon6.value;
        //console.log(this.refs.name.value, ref);

        var user ="1,2";
        var FormData = require('form-data');
        //const form = new FormData();
        //form.append('name', this.refs.name.value);
        //form.append('icon', ref);
        //form.append('users', user);


        let obj = {};

        obj['name'] = this.refs.name.value;
        obj['icon'] = 'trabalho';
        obj['users'] = user;

        console.log(obj, 'edição');

         var header = document.getElementById("header");
         var bodyScroll = document.getElementById("body");


        const {dispatch} = this.props;
        dispatch(editLists(this.props.list.id, obj));
         setTimeout(() => {bodyScroll.className = ""; header.className = "header header-list";this.setState({msgedit: this.props.msgedit})}, 500);
    }

    _submit(event) {
        event.preventDefault();
        var add = {
            name: this.refs.name.value,
            quant: this.refs.quant.value,
            desc: this.refs.description.value
        };

        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");

        header.className = "header header-list";
        bodyScroll.className = "";

        var l = this.props.item.produtos;

        l.push(add);
        this.setState({lc: l, showModal: false});
    }
}

Item.propTypes = {
    list: React.PropTypes.object.isRequired,
    listkey: React.PropTypes.number
}

const mapStateToProps = (state, ownProps) => {
    //console.info('container Item mapStateToProps', state, ownProps);
    return {msgdelete: state.lists.msgdelete, msgedit: state.lists.msgedit, users:state.userslist.userslist};
}


export default connect(mapStateToProps)(Item);
