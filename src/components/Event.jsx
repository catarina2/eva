import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

import { each } from 'lodash';

var DatePicker = require('react-datepicker');
var moment = require('moment');

import TimePicker from 'rc-time-picker';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

require('react-datepicker/dist/react-datepicker.css');
require ('react-day-picker/lib/style.css');
require ('rc-time-picker/assets/index.css');

import {deleteLists, editLists, postUsers, fetchFamilyUsers, addUserToEvent, removeUserToEvent} from '../actions';


class Event extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleclickuser = this.handleclickuser.bind(this);
        this.confirmdelete = this.confirmdelete.bind(this);
        this.noconfirm = this.noconfirm.bind(this);
        this._submitEdit = this._submitEdit.bind(this);

        this.state = {
            unline: false,
            showModalEdit: false,
            confirmdelete: false,
            msgdelete: null,
            msgedit: null

        };
    }
    componentDidMount() {
        //console.log(this.props.item, 'componentDidMount');

    }
    render() {
        console.log("PROPS EVENT ",this.props.ev);
            var ev = this.props.ev;
            var persona = [];
            var time="";
            ev.users.map((i, key) => {

                var classNameLosangle ={};
                var className = {};
                var avatar = "btn-smallEventavatar"+i.avatar+" "+i.color;
                if(ev.start_time==ev.end_time && ev.start_time=="00:00"){
                    time="Todo o dia"
                }else{
                    time= ev.start_time+"-"+ev.end_time;
                }
                classNameLosangle[i]="losangeUserEvent"+" "+i.color;

                className[i]="btn btn-persona"+i.color+"small";
                //console.info("ICON CLASSNAME: ", className[i])
                persona.push(<div className={classNameLosangle[i]}> <div className="Userevent"> <button ref="photo" className={avatar}></button></div></div>);

            });
        var showedit;
        if (this.state.showModalEdit) {
            var userslists = [];

            var family = this.props.usersfamily;   //users da familia da pessoa loga alterar quando tiver login
            console.log("PROPS ", this.props.usersfamily);
            //USERS
            var usersoflist = this.props.ev.users; // FALTA ID
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
                //console.log("USER ", user.avatar);
                each(usersoflist, (u, keyu) => {
                    console.log("USERFLIST ", u);
                    if (u.name === user.name) {

                        ccolor[key] = "losangecolor" + " " + "g" + user.color;
                        console.log("color[key] if ",ccolor[key], key);
                        color[key] = true;
                        return false;
                    }
                    else {
                        ccolor[key] = "losangecolor" + " " + user.color;
                        console.log("color[key] else ",ccolor[key], key);
                        color[key] = false;
                    }
                });
                var avatar = "btn-smallavatar" + userxx;
                userid[key] = user.id;
                if (this.state.ccolor === null) {
                    className[key] = ccolor[key];
                }
                else {
                    className = this.state.ccolor;
                }

                if (this.state.color === null) {
                    colorstate = color;
                }
                else {
                    colorstate = this.state.color;
                }
                userslists.push(<div key={key} className='displayavatares'>
                    <div className="cc-selectorperfil"
                         onClick={this.handleclickuser.bind(this, key, user.color, user.id)}>
                        <div className={className[key]}>
                            <div className="loscolor">
                                <button ref="photo" className={avatar}></button>
                            </div>
                        </div>
                    </div>
                </div>);
            });
            this.state.ccolor = className;
            this.state.color = colorstate;
            this.state.userid = userid;

        showedit = (
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="btn btn-default" onClick={this.handleEdit}><span
                                className="glyphicon glyphicon-remove"></span></button>
                            <h4 className="modal-title"><b>{}</b></h4>

                        </div>
                        <div className="modal-body">
                            <form id="form" method="POST" onSubmit={this._submitEdit} encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-xs-1">
                                        <button type="button" className="btn btn-note"></button>
                                    </div>
                                    <div className="col-xs-10">
                                        <h4>Título do evento</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <input type="text" className="form-control" defaultValue="título" maxLength="20" ref="title" name="name" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-1">
                                        <button type="button" className="btn btn-time"></button>
                                    </div>
                                    <div className="col-xs-10">
                                        <h4 >Dia do Evento</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="DD-MM-YYYY"
                                            dateFormat="DD-MM-YYYY"
                                            todayButton={"EVA"}
                                            minDate={moment()}
                                            value={this.state.startDate}
                                            selected={this.state.startDate} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-1">
                                        <button type="button" className="btn btn-peopleagend"></button>
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
                                    <div className="col-xs-1">
                                        <button type="button" className="btn btn-hour" ></button>
                                    </div>
                                    <div className="col-xs-10">
                                        <h4>Hora do Evento</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-1">
                                        <input type="checkbox" className="TodoDia" onClick={this.handleEventHour} checked={this.state.checkEventHour}/>
                                    </div>
                                    <div className="col-xs-10">
                                        <h3 className="color-gray day-time" >Dia inteiro</h3>
                                    </div>
                                </div>
                                <div className="row" id="timePicker">
                                    <div className="col-xs-12">
                                        <TimePicker
                                            showSecond={showSecond}
                                            value={this.state.initialtime}
                                            className="hora-inicio"
                                            onChange={this.onChange}
                                            />
                                        <TimePicker
                                            showSecond={showSecond}
                                            value={this.state.finaltime}
                                            className="hora-fim"
                                            onChange={this.onChange2}
                                            />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-1">
                                        <button type="button" className="btn btn-location"></button>
                                    </div>
                                    <div className="col-xs-10">
                                        <h4>Adicionar Localização</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <input type="text" className="form-control" ref="location" name="name" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-xs-2">
                                        </div>
                                        <div className="col-xs-8">
                                            <Link to={`/`}>
                                                <button className="btn logolistsmallagend"></button>
                                            </Link>
                                        </div>
                                        <div className="col-xs-2">
                                            <div className="col-xs-2 display-icons">
                                                <button className="btn btn-delete" onClick={this.handleDelete}><span
                                                    className="glyphicon glyphicon-trash glist-trash"></span></button>
                                                <button type="submit" className="btn submit"></button>
                                            </div>
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
                                <h4 className="modal-title"><b>Lista {}</b></h4>
                            </div>
                            <div className="modal-body">
                                <h4>Deseja apagar este evento?</h4>

                                <div className="modal-footer">
                                    <button className="btn btn-confirm" onClick={this.confirmdelete}>Sim</button>
                                    <button className="btn btn-confirm" onClick={this.noconfirm}>Não</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        return (
            <div className="Event-container">
                <div className="Event-item"><div className="Event-items">{time} {persona} {ev.title} - {ev.location}</div></div>
                <div className="edit-Eventcontainer">
                    <button className="btn btn-deleteEvent" onClick={this.handleEdit}><span className="glyphicon glyphicon-edit Event-edit"></span></button>
                </div>
                {showedit}
                {showconfirm}
            </div>
        );}

    handleclickuser(key, color, id, event) {
        event.preventDefault();

        console.log("COLOR: ", color);
        var css = (this.state.color[key] === false) ? true : false;
        var usercolor = (this.state.ccolor[key] === "losangecolor"+" "+color) ? "losangecolor"+" "+'g'+color : "losangecolor"+" "+color;

        console.log("estado do user", css, id, this.props, this.props.list.id);
        if(css === true)
        {
            var FormData = require('form-data');
            const form = new FormData();
            form.append('users', id);
            const {dispatch} = this.props;
            dispatch(addUserToEvent(this.props.list.id, form));
        }
        else {
            console.log("remover user da lista")
            var obj = {};
            obj['users'] = id;
            const {dispatch} = this.props;
            dispatch(removeUserToEvent(this.props.list.id, obj));
        }
        var xcolor = {};
        xcolor[key] = css;

        var x = {};
        x[key] = usercolor;

        var tempcolor = Object.assign(this.state.color, xcolor);
        var temp = Object.assign(this.state.ccolor, x);

        this.setState({color:tempcolor, ccolor: temp});
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
        dispatch(deleteLists(this.props)); // FALTA ID
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
        dispatch(editLists(this.props, obj)); // FALTA ID
        setTimeout(() => {bodyScroll.className = ""; header.className = "header header-list";this.setState({msgedit: this.props.msgedit})}, 500);
    }

}

Event.propTypes = {
    ev: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return {events: state.events, usersfamily: state.userslist.users, msg: state.events.msgadd, data: state.events.dataadd, users:state.userslist.userslist};
}


export default connect(mapStateToProps)(Event);