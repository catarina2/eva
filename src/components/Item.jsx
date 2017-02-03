import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produtos from './Produtos';
import User from './User';
import {Link} from 'react-router';
import { each } from 'lodash';

import {fetchListUsers} from '../actions';
import {fetchListProducts, deleteLists, editLists, postUsers} from '../actions';

class Item extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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
            confirmdelete: false,
            msgdelete: null,
            msgedit: null,
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
        var namemessage;


        // console.log(this.state.msg, this.props.lists, 'mensagem de apagar');
        if (this.state.msgdelete === "OK") {
            var bodyScroll = document.getElementById("body");
            bodyScroll.classList.remove("body-stop-scroll");
           
            setTimeout(() => {this.setState({confirmdelete: false, msgdelete: null, showModalEdit: false})}, 500);
        }

        if (this.state.msgedit === "OK") {
            var bodyScroll = document.getElementById("body");
            bodyScroll.classList.remove("body-stop-scroll");
            this.state.showModalEdit = false;
            this.state.msgedit = null;
            this.state.color =  null;
            this.state.ccolor =  null;
            this.state.userid =  null;
            this.state.nameicon =  null;
            this.state.cname =  null;
            this.state.iconid =  null;
            this.state.icons =  null;
            this.state.check =  {0: "trabalho"};
            this.state.icon= [{name: "trabalho", id: 0, classname: "gicontrabalho", state: "checked"}, {name: "natal", id: 1, classname: "iconnatal", state: "unchecked"}, {name: "ovo", id: 2,classname: "iconovo", state: "unchecked"}, {name: "ferias", id: 3,classname: "iconferias", state: "unchecked"}, {name: "prenda", id: 4,classname: "iconprenda", state: "unchecked"}];
            
            //setTimeout(() => {this.setState({confirmdelete: false, msg: null})}, 500);
        }
        if (this.state.msgedit === "NOK") {
          var data = this.props.dataedit;
          namemessage= data[0];
             
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
            
            var family = this.props.usersfamily;   //users da familia da pessoa loga alterar quando tiver login
            //console.log(family, 'usersfamily');
            //USERS
            var usersoflist = this.props.users[list.id]; 
           // console.log(usersoflist);
            var usercolor = {};
             var className = {};
             var colorstate = {};
             var ccolor = {};
             var color = {};
             var userid = {};
             each(family, (user, key) => {
                 console.log("USER ", user);
                var userxx = user.avatar;
                each(usersoflist, (u, keyu) => {
                    console.log("USERFLIST ", u);
                  if(u.name === user.name){
                     
                      ccolor[key] = "losangecolor"+" "+"g"+user.color;
                      console.log(ccolor[key], key);
                      color[key] = true;
                      return false;
                  }
                  else{
                      ccolor[key] = "losangecolor"+" "+user.color;
                      console.log(ccolor[key], key);
                      color[key] = false;
                  }
                });
                var avatar = "btn-smallavatar"+ userxx;
                userid[key] = user.id;
                if(this.state.ccolor === null)
                {
                  className[key] = ccolor[key];
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
               userslists.push(<div key ={key} className='displayavatares'>
                                <div className="cc-selectorperfil" onClick={this.handleclickuser.bind(this, key, user.color)}>
                                   <div className={className[key]}> <div className="loscolor"> <button ref="photo" className={avatar}></button></div></div> </div>
                              </div>);
            });
            this.state.ccolor = className;
            this.state.color = colorstate;
            this.state.userid = userid;
            //console.log(this.state.ccolor, this.state.color);
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
              var iconlistsauxiliar = [];
              var temp;
              if(list.icon !== "trabalho")
              {
                  iconlist[0].state = "unchecked";
                  iconlist[0].classname = "icontrabalho";
              }
              each(iconlist, (icon, key) => {
                if(icon.name === list.icon){
                    icon.state = "checked";
                    if(key === 0) icon.classname = icon.classname;
                    else icon.classname = "g"+icon.classname;
                    temp = icon;
                }
                else{
                  temp = icon;
                }
                iconlistsauxiliar.push(temp);
                 
              });
              each(iconlistsauxiliar, (icon, key) => {
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
                   iconlists.push(<div key ={key} className='displayavatares'>
                                    <div className="cc-selectorperfil">
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
                                                   defaultValue={list.name} maxLength="20"/>
                                            <div className="validation">{namemessage}</div>
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
                                        <div className="col-xs-10 displayavatares">
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
                                        <div className="col-xs-10 displayavatares">
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

        console.log("COLOR: ", color);
        var css = (this.state.color[key] === false) ? true : false;
        var usercolor = (this.state.ccolor[key] === "losangecolor"+" "+color) ? "losangecolor"+" "+'g'+color : "losangecolor"+" "+color;
      
        var xcolor = {};
        xcolor[key] = css;

        var x = {};
        x[key] = usercolor;

        var tempcolor = Object.assign(this.state.color, xcolor);
        var temp = Object.assign(this.state.ccolor, x);

        this.setState({color:tempcolor, ccolor: temp});
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

        var keychecked;
        let obj = {};

        each(this.state.nameicon, (icon, key) => {
           if(icon === "checked")
           {
              keychecked = key;
           }
        });
        var iconchecked = this.state.icon[keychecked];
        

        obj['name'] = this.refs.name.value;
        obj['icon'] = iconchecked.name;
        obj['created_by'] = '2';

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
    return {usersfamily: state.userslist.users, msgdelete: state.lists.msgdelete, msgedit: state.lists.msgedit, dataedit: state.lists.dataedit, users:state.userslist.userslist};
}


export default connect(mapStateToProps)(Item);
