import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produtos from './Produtos';
import User from './User';
import {Link} from 'react-router';

import {fetchListUsers} from '../actions';
import {fetchListProducts, deleteLists, editLists} from '../actions';

class Item extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleiconclick1 = this.handleiconclick1.bind(this);
        this.handleiconclick2 = this.handleiconclick2.bind(this);
        this.handleiconclick3 = this.handleiconclick3.bind(this);
        this.handleiconclick4 = this.handleiconclick4.bind(this);
        this.handleiconclick5 = this.handleiconclick5.bind(this);
        this.handleiconclick6 = this.handleiconclick6.bind(this);
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
            cyellow: 'useryellow'
        }
    }

    componentDidMount() {
        //console.log(this.props.item, 'componentDidMount');
        const {dispatch} = this.props;
        dispatch(fetchListUsers(this.props.list.id));
        dispatch(fetchListProducts(this.props.list.id));
    }

    render() {
        var list = this.props.list;
        var panel = null;


        // console.log(this.state.msg, this.props.lists, 'mensagem de apagar');
        if (this.state.msgdelete === "OK") {
           
            setTimeout(() => {this.setState({confirmdelete: false, msgdelete: null})}, 500);
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
        else if (list.icon === "roupa") {
            icon = <button className="btn roupa list-icon"></button>;
        }

        var showedit;
        //console.log(this.state.showModalEdit);

        if (this.state.showModalEdit) {
             var userslist=[];
            
            var family = this.props.users;
             //console.log(this.props.users, 'usersfamily');
            //console.log(family, 'tamanho usersfamily');

            var fun1, fun2, fun3, fun4, fun5;
            var fun;
            var usercolor1, usercolor2, usercolor3, usercolor4, usercolor5, className1, className2, className3, className4, className5, check1, check2, check3, check4, check5;
            if(family.length ===1)
            {

                  var usercolor='user'+family[0].color;
                  var className;
                  var check =family[0].color;
                  
                  if(check === 'red') {fun = this.handleiconclickred; className = this.state.cred} 
                  if(check === 'pink') {fun = this.handleiconclickpink; className = this.state.cpink}
                  if(check === 'blue') {fun = this.handleiconclickblue; className = this.state.cblue}
                  if(check === 'green') {fun = this.handleiconclickgreen; className = this.state.cgreen}
                  if(check === 'yellow') {fun = this.handleiconclickyellow; className = this.state.cyellow}
                  userslist=(<div className="cc-selector">
                                <input id={usercolor} type="radio" name={usercolor} ref={usercolor} value={family[0].id} defaultChecked={check}/>
                                <label className={className} htmlFor={usercolor} onClick={fun}></label>    
                            </div>);
            }
            if(family.length===2)
            {
                  usercolor1='user'+family[0].color;
                  usercolor2='user'+family[1].color;
                  className1 = 'user-cc btn-'+usercolor1;
                  className2 = 'user-cc btn-'+usercolor2;
                  check1 =family[0].color;
                  check2 =family[1].color;
                  if(check1 === 'red' ) fun1 = this.handleiconclickred;
                  if(check1 === 'pink') fun1 = this.handleiconclickpink;
                  if(check1 === 'blue') fun1 = this.handleiconclickblue;
                  if(check1 === 'green') fun1 = this.handleiconclickgreen;
                  if(check2 === 'red' ) fun2 = this.handleiconclickred;
                  if(check2 === 'pink') fun2 = this.handleiconclickpink;
                  if(check2 === 'blue') fun2 = this.handleiconclickblue;
                  if(check2 === 'green') fun2 = this.handleiconclickgreen;
                  userslist=(<div className='display'><div className="cc-selector">
                                <input id={usercolor1} type="radio" name={usercolor1} ref={usercolor1} value={family[0].id} defaultChecked={check1}/>
                                <label className={className1} htmlFor={usercolor1} onClick={fun1}></label>    
                            </div>
                            <div className="cc-selector">
                                <input id={usercolor2} type="radio" name={usercolor2} ref={usercolor2} value={family[1].id} defaultChecked={check2}/>
                                <label className={className2} htmlFor={usercolor2} onClick={fun2}></label>    
                            </div></div>);
            }
            var user1, user2, user3;
            if(family.length===3)
            {
                  usercolor1='user'+family[0].color;
                  usercolor2='user'+family[1].color;
                  usercolor3='user'+family[2].color;
                  check1 =family[0].color;
                  check2 =family[1].color;
                  check3 =family[2].color;
                  
                  if(check1 === 'red' ){ fun1 = this.handleiconclickred; check1 = this.state.red;  className1 = this.state.cred}
                  if(check1 === 'pink') {fun1 = this.handleiconclickpink; check1 = this.state.pink; className1 = this.state.cpink}
                  if(check1 === 'blue') {fun1 = this.handleiconclickblue; check1 = this.state.blue; className1 = this.state.cblue}
                  if(check1 === 'green') {fun1 = this.handleiconclickgreen; check1 = this.state.green; className1 = this.state.cgreen}
                  if(check1 === 'yellow') {fun1 = this.handleiconclickyellow; check1 = this.state.yellow; className1 = this.state.cyellow}
                  if(check2 === 'red' ) {fun2 = this.handleiconclickred; check2 = this.state.red; className2 = this.state.cred}
                  if(check2 === 'pink') {fun2 = this.handleiconclickpink; check2 = this.state.pink; className2 = this.state.cpink}
                  if(check2 === 'blue') {fun2 = this.handleiconclickblue; check2 = this.state.blue; className2 = this.state.cblue}
                  if(check2 === 'green') {fun2 = this.handleiconclickgreen; check2 = this.state.green; className2 = this.state.cgreen}
                  if(check2 === 'yellow') {fun2 = this.handleiconclickyellow; check2 = this.state.yellow; className2 = this.state.cyellow}
                  if(check3 === 'red' ) {fun3 = this.handleiconclickred; check3 = this.state.red; className3 = this.state.cred}
                  if(check3 === 'pink') {fun3 = this.handleiconclickpink; check3 = this.state.pink; className3 = this.state.cpink}
                  if(check3 === 'blue') {fun3 = this.handleiconclickblue; check3 = this.state.blue; className3 = this.state.cblue}
                  if(check3 === 'green') {fun3 = this.handleiconclickgreen; check3 = this.state.green; className3 = this.state.cgreen}
                  if(check3 === 'yellow') {fun3 = this.handleiconclickyellow; check3 = this.state.yellow; className3 = this.state.cyellow}
                  //if(check1)

                  userslist=(<div className='display'><div className="cc-selector">
                                <input id={usercolor1} type="radio" name={usercolor1} ref={usercolor1} value={family[0].id} checked={check1}/>
                                <label className={className1} htmlFor={usercolor1} onClick={fun1}></label>    
                            </div>
                            <div className="cc-selector">
                                <input id={usercolor2} type="radio" name={usercolor2} ref={usercolor2} value={family[1].id} checked={check2}/>
                                <label className={className2} htmlFor={usercolor2} onClick={fun2}></label>    
                            </div>
                            <div className="cc-selector">
                                <input id={usercolor3} type="radio" name={usercolor3} ref={usercolor3} value={family[2].id} checked={check3}/>
                                <label className={className3} htmlFor={usercolor3} onClick={fun3}></label>    
                            </div></div>);
            }
            if(family.length===4)
            {
                  usercolor1='user'+family[0].color;
                  usercolor2='user'+family[1].color;
                  usercolor3='user'+family[2].color;
                  usercolor4='user'+family[3].color;
                  check1 =family[0].color;
                  check2 =family[1].color;
                  check3 =family[2].color;
                  check4 =family[3].color;
                  
                  if(check1 === 'red' ){ fun1 = this.handleiconclickred; check1 = this.state.red;  className1 = this.state.cred}
                  if(check1 === 'pink') {fun1 = this.handleiconclickpink; check1 = this.state.pink; className1 = this.state.cpink}
                  if(check1 === 'blue') {fun1 = this.handleiconclickblue; check1 = this.state.blue; className1 = this.state.cblue}
                  if(check1 === 'green') {fun1 = this.handleiconclickgreen; check1 = this.state.green; className1 = this.state.cgreen}
                  if(check1 === 'yellow') {fun1 = this.handleiconclickyellow; check1 = this.state.yellow; className1 = this.state.cyellow}
                  if(check2 === 'red' ) {fun2 = this.handleiconclickred; check2 = this.state.red; className2 = this.state.cred}
                  if(check2 === 'pink') {fun2 = this.handleiconclickpink; check2 = this.state.pink; className2 = this.state.cpink}
                  if(check2 === 'blue') {fun2 = this.handleiconclickblue; check2 = this.state.blue; className2 = this.state.cblue}
                  if(check2 === 'green') {fun2 = this.handleiconclickgreen; check2 = this.state.green; className2 = this.state.cgreen}
                  if(check2 === 'yellow') {fun2 = this.handleiconclickyellow; check2 = this.state.yellow; className2 = this.state.cyellow}
                  if(check3 === 'red' ) {fun3 = this.handleiconclickred; check3 = this.state.red; className3 = this.state.cred}
                  if(check3 === 'pink') {fun3 = this.handleiconclickpink; check3 = this.state.pink; className3 = this.state.cpink}
                  if(check3 === 'blue') {fun3 = this.handleiconclickblue; check3 = this.state.blue; className3 = this.state.cblue}
                  if(check3 === 'green') {fun3 = this.handleiconclickgreen; check3 = this.state.green; className3 = this.state.cgreen}
                  if(check3 === 'yellow') {fun3 = this.handleiconclickyellow; check3 = this.state.yellow; className3 = this.state.cyellow}
                  if(check4 === 'red' ) {fun4 = this.handleiconclickred; check4 = this.state.red; className4 = this.state.cred}
                  if(check4 === 'pink') {fun4 = this.handleiconclickpink; check4 = this.state.pink; className4 = this.state.cpink}
                  if(check4 === 'blue') {fun4 = this.handleiconclickblue; check4 = this.state.blue; className4 = this.state.cblue}
                  if(check4 === 'green') {fun4 = this.handleiconclickgreen; check4 = this.state.green; className4 = this.state.cgreen}
                  if(check4 === 'yellow') {fun4 = this.handleiconclickyellow; check4 = this.state.yellow; className4 = this.state.cyellow}
                  //if(check1)
                  
                  userslist=(<div className='display'><div className="cc-selector">
                                <input id={usercolor1} type="radio" name={usercolor1} ref={usercolor1} value={family[0].id} checked={check1}/>
                                <label className={className1} htmlFor={usercolor1} onClick={fun1}></label>    
                            </div>
                            <div className="cc-selector">
                                <input id={usercolor2} type="radio" name={usercolor2} ref={usercolor2} value={family[1].id} checked={check2}/>
                                <label className={className2} htmlFor={usercolor2} onClick={fun2}></label>    
                            </div>
                            <div className="cc-selector">
                                <input id={usercolor3} type="radio" name={usercolor3} ref={usercolor3} value={family[2].id} checked={check3}/>
                                <label className={className3} htmlFor={usercolor3} onClick={fun3}></label>    
                            </div>
                            <div className="cc-selector">
                                <input id={usercolor4} type="radio" name={usercolor4} ref={usercolor4} value={family[3].id} checked={check4}/>
                                <label className={className4} htmlFor={usercolor4} onClick={fun4}></label>    
                            </div></div>);
            }
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
                                    <div className="row cc-selector display">
                                        <div className="col-xs-2 icon">
                                                 <input id="icon1" type="radio" name="icon1" ref="icon1" value="trabalho"/>
                                                 <label className="icon-cc btn-icon1" htmlFor="icon1"  onClick={this.handleiconclick1}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon2" type="radio" name="icon2" ref="icon2" value="natal"/>
                                                 <label className="icon-cc btn-icon2" htmlFor="icon2"  onClick={this.handleiconclick2}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon3" type="radio" name="icon3" ref="icon3" value="prenda"/>
                                                 <label className="icon-cc btn-icon3" htmlFor="icon3"  onClick={this.handleiconclick3}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon4" type="radio" name="icon4" ref="icon4" value="ovo"/>
                                                 <label className="icon-cc btn-icon4" htmlFor="icon4" onClick={this.handleiconclick4}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon5" type="radio" name="icon5" ref="icon5" value="ferias"/>
                                                 <label className="icon-cc btn-icon5" htmlFor="icon5" onClick={this.handleiconclick5}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon6" type="radio" name="icon6" ref="icon6" value="roupa"/>
                                                 <label className="icon-cc btn-icon6" htmlFor="icon6" onClick={this.handleiconclick6}></label>
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
                                            <div className="col-xs-2 display">
                                                <button className="btn btn-delete" onClick={this.handleDelete}><span
                                                    className="glyphicon glyphicon-trash glist"></span></button>
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


        return (
            <div className="panel panel-primary">
                <div className="panelrow">
                    <div className="panel-heading">
                        {icon}

                            <div className="panel-title" onClick={this.handleClick}>
                                <div className="list font-medium"><b>{list.name}</b></div>
                            </div>
                            <div className="list-info-container">
                                <div className="user-container">
                                    <User id={list.id}/>
                                </div>
                                <div className="edit-container">
                                    <button className="btn btn-delete1" onClick={this.handleEdit}><span
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
        //console.log(this.state.pink, this.state.red, this.state.blue, 'handleclickuser pink');
        var css = (this.state.pink === false) ? true : false;
        var color = (this.state.cpink === 'userpink') ? 'guserpink' : 'userpink';
        this.setState({pink:css, cpink: color});
    }
    handleiconclickblue(event) {
        event.preventDefault();
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
       this.setState({confirmdelete: true});
    }
    confirmdelete() {
        const {dispatch} = this.props;
        dispatch(deleteLists(this.props.list.id));
        setTimeout(() => {this.setState({msgdelete: this.props.msgdelete})}, 500);
    }
    noconfirm() {
        this.setState({confirmdelete: false});
    }
    handleEdit() {
        //console.log(this.props, 'handleEdit');
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
        obj['icon'] = ref;
        obj['users'] = user;

        console.log(obj, 'edição');


        const {dispatch} = this.props;
        dispatch(editLists(this.props.list.id, obj));
         setTimeout(() => { this.setState({msgedit: this.props.msgedit})}, 500);
    }

    _submit(event) {
        event.preventDefault();
        var add = {
            name: this.refs.name.value,
            quant: this.refs.quant.value,
            desc: this.refs.description.value
        };

        var l = this.props.item.produtos;

        l.push(add);
        this.setState({lc: l, showModal: false});
    }
}

Item.propTypes = {
    list: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    //console.info('container Item mapStateToProps', state, ownProps);
    return {msgdelete: state.lists.msgdelete, msgedit: state.lists.msgedit, users:state.userslist.users};
}


export default connect(mapStateToProps)(Item);
