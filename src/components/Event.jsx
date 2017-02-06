import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router';
import { each } from 'lodash';

var DatePicker = require('react-datepicker');
var moment = require('moment');

import TimePicker from 'rc-time-picker';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

require('react-datepicker/dist/react-datepicker.css');
require ('react-day-picker/lib/style.css');
require ('rc-time-picker/assets/index.css');

import {DeleteEvent, updateEvents, fetchFamilyUsers, addUserToEvent, removeUserToEvent} from '../actions';


class Event extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChange= this.onChange.bind(this);
        this.onChange2= this.onChange2.bind(this);
        this.handleEventHour= this.handleEventHour.bind(this);
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
            msgedit: null,

            color: null,
            ccolor: null,
            userid: null,

            startDate: moment(),
            initialtime: moment(),
            finaltime: moment(),
            checkEventHour: false,

        };
    }
    componentDidMount() {
        //console.log(this.props.item, 'componentDidMount');

    }
    render() {
        //console.log("PROPS EVENT ",this.props.ev, "date ", this.props.ev.date);
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

            //console.log("PROPS ", this.props.usersfamily);
            //USERS
            var usersofevent = this.props.ev.users; // FALTA ID
            var usercolor = {};
            var className = {};
            var colorstate = {};
            var ccolor = {};
            var color = {};
            var userid = {};

            if(family){

            var hour=ev.start_time.substring(0, 2);
            var minute=ev.start_time.substring(3, 5);
            var startTime=moment().hour(hour).minute(minute);
                hour=ev.end_time.substring(0, 2);
                minute=ev.end_time.substring(3, 5);
            var endTime=moment().hour(hour).minute(minute);

            each(family, (user, key) => {
                //console.info("Each Family ");
                var userxx = user.avatar;
                //console.log("USER ", user.avatar);
                each(usersofevent, (u, keyu) => {
                    //console.log("Each usersofevent");
                    if (u.name == user.name) {

                        ccolor[key] = "losangecolor" + " " + "g" + user.color;
                        //console.log("color[key] if ",ccolor[key], key);
                        color[key] = true;
                        return false;
                    }
                    else {
                        ccolor[key] = "losangecolor" + " " + user.color;
                        //console.log("color[key] else ",ccolor[key], key);
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
                //console.log("PRE USERLISTS: ",key, user.color, user.id);
                userslists.push(<div key ={key} className='displayavatares'>
                    <div className="cc-selectorperfil" onClick={this.handleclickuser.bind(this, key, user.color, user.id)}>
                        <div className={className[key]}> <div className="loscolor"> <button ref="photo" className={avatar}></button></div></div> </div>
                </div>);
                //console.log("USERLISTS: ", userslists);
            });
            this.state.ccolor = className;
            this.state.color = colorstate;
            this.state.userid = userid;
            }else{
                userslists.push(<div className='displayavatares'>Convide membros para a sua familia.</div>);
            }
        showedit = (
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="btn btn-default" onClick={this.handleEdit}><span
                                className="glyphicon glyphicon-remove"></span></button>
                            <h4 className="modal-title"><b>{ev.title}</b></h4>

                        </div>
                        <div className="modal-body">
                            <form id="form" method="POST" onSubmit={this._submitEdit} encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-xs-1">
                                        <button type="button" className="btn btn-note"></button>
                                    </div>
                                    <div className="col-xs-10">
                                        <h4>Titulo do evento</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <input type="text" className="form-control" defaultValue={ev.title} maxLength="20" ref="title" name="name" />
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
                                            openToDate={moment(ev.date)}
                                            selected={moment(ev.date)} onChange={this.handleChange}/>
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
                                            defaultValue={startTime}
                                            className="hora-inicio"
                                            onChange={this.onChange}
                                            />
                                        <TimePicker
                                            showSecond={showSecond}
                                            defaultValue={endTime}
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
                                        <h4>Adicionar Local</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <input type="text" className="form-control" defaultValue={ev.location} ref="location" name="name" />
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

        //console.log("COLOR: ", this.state.ccolor[0]);
        var css = (this.state.color[key] === false) ? true : false;
        var usercolor = (this.state.ccolor[key] === "losangecolor"+" "+color) ? "losangecolor"+" "+'g'+color : "losangecolor"+" "+color;

       var token = window.localStorage.getItem("UserLoggedToken");
        //console.log("estado do user", css, id, this.props, this.props.list.id);
        if(css === true)
        {
            var FormData = require('form-data');
            const form = new FormData();
            form.append('users', id);
            const {dispatch} = this.props;
            dispatch(addUserToEvent(this.props.ev.id, form, token));
        }
        else {
            var obj = {};
            obj['users'] = id;
            const {dispatch} = this.props;
            dispatch(removeUserToEvent(this.props.ev.id, obj, token));
        }
        var xcolor = {};
        xcolor[key] = css;

        var x = {};
        x[key] = usercolor;

        var tempcolor = Object.assign(this.state.color, xcolor);
        var temp = Object.assign(this.state.ccolor, x);

        this.setState({color:tempcolor, ccolor: temp});
    }
    handleEventHour(){
        event.preventDefault();

        var timePicker = document.getElementById("timePicker");
        if(this.state.checkEventHour==false){
            timePicker.classList.add('row-visually-hidden');

            setTimeout(function () {timePicker.classList.add('row-hidden'); }, 20);

        }else{
            timePicker.className =('row row-visually-hidden');
            setTimeout(function () {
                timePicker.className =('row');
            }, 20);
        }

        var css = (this.state.checkEventHour === false) ? true : false;
        this.setState({checkEventHour:css});

    }
    onChange(value) {
        this.setState({
            initialtime: value
        });
    }
    onChange2(value) {
        this.setState({
            finaltime: value
        });
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });

    }
    handleDelete() {
        // console.log(this.props, 'handleDelete');
        var headerfirst = document.getElementById("headerfirst");
        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");
        var btnNewagend = document.getElementById("btn-newagend");

        setTimeout(() => {
            headerfirst.classList.add("headerfirst-hide");
            header.classList.add("header-hide");
            btnNewagend.classList.add("btn-newagend-hide");
            bodyScroll.classList.add("body-stop-scroll");
        }, 520);
        this.setState({confirmdelete: true});
    }
    confirmdelete() {

        var headerfirst = document.getElementById("headerfirst");
        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");
        var btnNewagend = document.getElementById("btn-newagend");

        headerfirst.classList.add("headerfirst-hide");
        header.classList.add("header-hide");
        btnNewagend.classList.add("btn-newagend-hide");
        bodyScroll.classList.add("body-stop-scroll");

        const {dispatch} = this.props;
        dispatch(DeleteEvent(this.props.ev.id)); // FALTA ID
        setTimeout(() => {this.setState({msgdelete: this.props.msgdelete})}, 500);
    }
    noconfirm() {
        this.setState({confirmdelete: false});
    }
    handleEdit() {
        //console.log(this.props, 'handleEdit');
        var headerfirst = document.getElementById("headerfirst");
        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");
        var btnNewagend = document.getElementById("btn-newagend");

        if(this.state.showModalEdit === false){
            headerfirst.classList.add("headerfirst-hide");
            header.classList.add("header-hide");
            btnNewagend.classList.add("btn-newagend-hide");
            bodyScroll.classList.add("body-stop-scroll");
        }else{
            headerfirst.className = "headerfirst";
            header.className = "header header-agend";
            btnNewagend.className = "btn btn-newagend";
            bodyScroll.className = "";
        }
        var css = (this.state.showModalEdit === false) ? true : false;
        this.setState({showModalEdit:css});
    }
    _submitEdit(event) {
        event.preventDefault();

        var headerfirst = document.getElementById("headerfirst");
        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");
        var btnNewagend = document.getElementById("btn-newagend");

        if(this.state.showModalEdit === false){
            headerfirst.classList.add("headerfirst-hide");
            header.classList.add("header-hide");
            btnNewagend.classList.add("btn-newagend-hide");
            bodyScroll.classList.add("body-stop-scroll");
        }else{
            headerfirst.className = "headerfirst";
            header.className = "header header-agend";
            btnNewagend.className = "btn btn-newagend";
            bodyScroll.className = "";
        }

        var users;
        var eventusers = [];

        var color = this.state.color;
        var userid = this.state.userid;
        each(color, (color, key) => {
            if(color) {
                users = userid[key];
                eventusers.push(users);
            }
        });
        //console.log("USERS - ", users);
        let user = [];
        user = eventusers;
        var FormData = require('form-data');
        const form = new FormData();
        form.append('users', user);
        form.append('date', this.state.startDate && this.state.startDate.format('DD/MM/YYYY'));
        form.append('location', this.refs.location.value);
        form.append('title', this.refs.title.value);
        if(this.state.checkEventHour==false) {
            form.append('start_time', this.state.initialtime && this.state.initialtime.format(str));
            form.append('end_time', this.state.finaltime && this.state.finaltime.format(str));
        }else{
            form.append('start_time', "00:00");
            form.append('end_time', "00:00");
        }
        var id = window.localStorage.getItem("UserLoggedId");
        form.append('created_by', id);
        var token = window.localStorage.getItem("UserLoggedToken");
        const {dispatch} = this.props;
        dispatch(updateEvents(this.props.ev.id, form, token));

        setTimeout(() => {this.setState({showModalEdit: false}, this.props.data);}, 500);
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