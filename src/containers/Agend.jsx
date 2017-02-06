import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DayPicker, { DateUtils } from 'react-day-picker';
import Event from '../components/Event';

import { each } from 'lodash';


import {postevent, fetchUserEvents, fetchFamilyUsers, addUserToEvent} from '../actions';

var DatePicker = require('react-datepicker');
var moment = require('moment');

import TimePicker from 'rc-time-picker';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

require('react-datepicker/dist/react-datepicker.css');
require ('react-day-picker/lib/style.css');
require ('rc-time-picker/assets/index.css');

class Agend extends Component{

     constructor(props) {
        super(props);
        this.handleDayClick  = this.handleDayClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this._submit = this._submit.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.onChange= this.onChange.bind(this);
         this.onChange2= this.onChange2.bind(this);
         this.handleEventHour= this.handleEventHour.bind(this);

         var bodyScroll = document.getElementById("body");
         bodyScroll.className = "";

         this.state = {

             color: null,
             ccolor: null,
             userid: null,
             user: null,

             msg: this.props.msg,
             data:this.props.data,


            checkedu1: false,
            checkedu2: false,
            checkedu3: false,
            checkedu4: false,
            showModal: false,
            checkEventHour: false,
            showHideSidenav: "hidden",
            selectedDay: null,
            day: null,
            month: new Date(),
            cd: null,
            showev: false,
            startDate: moment(),
            initialtime: moment(),
             finaltime: moment(),
            ev: []
           }

    }

    componentDidMount() {
        // console.log('componentdidMount');
        const {dispatch} = this.props;
        var token = window.localStorage.getItem("UserLoggedToken");
        var family = window.localStorage.getItem("UserLoggedFamily_id");
        var id = window.localStorage.getItem("UserLoggedId");
        dispatch(fetchFamilyUsers(family, token));
        dispatch(fetchUserEvents(id, token)); // MUDAR PARA ID FAMILIA  ex: loggeduser.family_id
    }


    render(){

        //console.log("VER events em PROPS: ", this.props);

        var ev= this.props.events.events;
        this.state.ev=ev;
        //console.log("STATE ev ", ev);
        const event = this.props.events.events;
        //console.log("event: ", event);

        const EventDays={};

        var eventDate=[];
        each(event, (event, key) => {
            var eventdate = event.event.date;
            eventdate=eventdate.substring(0, 2);
            EventDays[eventdate] = [{date: event.event.date}],[{day: eventdate}];

        })


        function renderDay(day) {
            var EventList=[];

            const date = day.getDate();
            var month= day.getMonth()+1;
            var year= day.getFullYear();
            var dateEvent=date;
            if (date.toString().length < 2) {
                dateEvent = "0" + dateEvent;
            }
            if (month.toString().length < 2) {
                month = "0" + month;
            }
            var fullDate= dateEvent+"/"+month+"/"+year;
            var FullDate=String(fullDate);

            EventDays[dateEvent] &&
            EventDays[dateEvent].map((EventDays, i) =>{
                if(EventDays.date===FullDate){
                    EventList.push(<div className="EventNotification" key={ i }>
                    </div>);
                }});


            return (
                <div>
                    { date }
                    <div className="Events-List">
                        {EventList}
                    </div>
                </div>
            )
        }

        const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
            'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
            'Dezembro'];
        const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
        var fullDate = this.state.month;
        var weekday = new Array(7);
                weekday[0] =  "Domingo";
                weekday[1] = "Segunda-feira";
                weekday[2] = "Terça-feira";
                weekday[3] = "Quarta-feira";
                weekday[4] = "Quinta-feira";
                weekday[5] = "Sexta-feira";
                weekday[6] = "Sábado";
        var n = weekday[fullDate.getDay()];
        var currentDate = fullDate.getDate()+" "+n;
        let currentDate1=null;
        if(this.state.selectedDay!==null)
        {
            var fullDate1 = this.state.selectedDay;
            var n1 = weekday[fullDate1.getDay()];
            currentDate1 = fullDate1.getDate()+" "+n1;
        }
        var show;
        if(this.state.showev === false)
        {
                show = <p>Não existe nenhum evento neste dia</p>;
                
        }
        else{
                show = (<ul className="list-group-agend">
                    {this.state.cd.map((i, key) => {
                            return (
                                <div className="event-item">
                                    <div className="row Notification-container">
                                        <div className="col-xs-12">
                                            <li className="displayEventAvatar" key={key}>
                                                <Event ev={i}/>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                    );
        }
        var showNav;
        if(this.state.showHideSidenav === 'hidden')
        {
            showNav = <button type="button" className="btn btn-agend1" aria-label="Left Align" onClick={this.handleClick}>
                            <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                        </button>;
        }
        else {
            showNav =
      <div className="modal">
        <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper-agend" role="navigation">
          <ul className="nav nav-agend sidebar-nav">
            <li className="sidebar-brand">
              <div className="row menu-lat">
                <div className="col-xs-2">
                  <input type="button" className="btn btn-smagend" />
                </div>
                <div className="col-xs-10 hamburguer" onClick={this.handleClick}>
                  <h3><b>Agenda</b> Familiar</h3>
                  <li className="col-xs-12 dropdown dropdown-agend">
                    <div className="font-medium dropownsize" onClick={this.handleModal}><b>Novo Evento</b></div>
                  </li>
                </div>
              </div>
            </li>
            <li className="dropdown">
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
        var showmodal;
        if(this.state.showModal)
        {


            //USERS
            var userslists=[];
            var family = this.props.usersfamily;
            //console.log(family, 'tamanho usersfamily');
            console.log(this.props.usersfamily, 'tamanho usersfamily');
            //foreach para os users de uma familia
            var usercolor;
            var className = {};
            var colorstate = {};
            var ccolor = {};
            var color = {};
            var userid = {};

            if(family){

            console.log(family, 0)
            each(family, (user, key) => {
                console.log(user, 'user')
                var userxx = user.avatar;
                var colorxx ="losangecolor"+" "+user.color;
                //console.log("COLORXX", user);
                ccolor[key] = colorxx;
                color[key] = false;
                userid[key] = user.id;

                var avatar = "btn-smallavatar"+ userxx[0];

                if(this.state.ccolor === null)
                {
                    className[key] = colorxx;
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
            //FINAL USERS
        }else{
            userslists.push(<div className='displayavatares'>Convide membros para a sua familia.</div>);
        }
        showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content modal-contentagend">
                            <div className="modal-header modal-headeragend">
                                <button className="btn btn-default" onClick={this.handleModal}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Novo Evento</b></h4>

                            </div>
                            <div className="modal-body">
                                  <form id="form" method="POST" onSubmit={this._submit} encType="multipart/form-data">
                                      <div className="row">
                                          <div className="col-xs-1">
                                              <button type="button" className="btn btn-note"></button>
                                          </div>
                                          <div className="col-xs-10">
                                              <h4>Adicionar Título</h4>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-xs-12">
                                              <input type="text" className="form-control" maxLength="20" ref="title" name="name" />
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
                                            <h4>Adicionar Local</h4>
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
                                                <button type="submit" className="btn submit-agend"></button>
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
                <Link to={`/callback`}><header id="headerfirst" className="headerfirst ">
                   <div className="container">
                       <div className="title">eva</div>
                    </div>
                </header></Link>
                <header id="header"  className="header header-agend">
                    <div className="container">
                    <div className="menu-title font-large"><b>Agenda </b>Familiar</div>
                        {showNav}
                        {showmodal}

                    
                    </div>
                </header>
                <section>
                        <div className="">
                            <div className="">
                                <DayPicker  renderDay={renderDay } months={ MONTHS } weekdaysShort={ WEEKDAYS_SHORT } selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) } onDayClick={ this.handleDayClick.bind(this) } />
                            </div>
                        </div>
                        <div className="container">
                        <div className="row">
                            <div className="col-xs-12 date">
                                <p>{(this.state.selectedDay!==null) ? currentDate1 : currentDate }</p>
                            </div>
                        </div>
                        <hr className="classhr"/>
                        {show}
                        <hr className="classhr-end"/>
                        </div>
                </section>
                <footer className="footerfixedagenda navbar fixed-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-10">
                                <div className="titlefooter">Environmental Virtual Assistant</div>
                            </div>
                            <div className="col-xs-2">
                                <button id="btn-newagend" className="btn btn-newagend" onClick={this.handleModal}></button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    	);
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
        console.log(value && value.format(str));
        this.setState({
            initialtime: value
        });
    }
    onChange2(value) {
        console.log(value && value.format(str));
        this.setState({
            finaltime: value
        });
    }
    handleChange(date) {

        console.log(date);
    this.setState({
        startDate: date
    });
        console.log(this.state.startDate);

    }

    handleDayClick(e, day) {
        var fullDate = day;
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : (fullDate.getMonth() + 1);
        var Day = fullDate.getDate();
        if (twoDigitMonth == 10 || twoDigitMonth == 11 || twoDigitMonth == 12) {
        } else {
            twoDigitMonth = "0" + twoDigitMonth;
        }
        if (Day.toString().length < 2) {
            Day = "0" + Day;
        }
        //console.log("DIA ", Day);
        var currentDate = Day + "/" + twoDigitMonth + "/" + day.getFullYear();
        var ev = [];
        //console.log("VAR state.ev ", this.state.ev);
        //console.log("VAR currentDate ", currentDate);

        each(this.state.ev, (id, key) => {
            //console.log("EACH event ", id.event);

            //console.log("VAR i.date ", id.event.date);
            if (currentDate == id.event.date) {
                //console.info("VAR i ", id.event);
                ev.push(id.event);
            }

            if (ev.length === 0) {
                this.setState({showev: false});
            }
            else {
                this.setState({showev: true, cd: ev});
            }
            this.setState({selectedDay: day});
        })

    }
    handleClick(){

        var bodyScroll = document.getElementById("body");
        bodyScroll.classList.add("body-stop-scroll");

        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});

        if(this.state.showHideSidenav == "hidden"){
            bodyScroll.classList.add("body-stop-scroll");
        } else{
            bodyScroll.className = "";
        }

    }
     handleModal(){

         var bodyScroll = document.getElementById("body");

        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css, showHideSidenav: 'hidden'});

         if(this.state.showModal == false){
             setTimeout(() => {
                 bodyScroll.classList.add("body-stop-scroll");
             }, 500);
         } else{
                 bodyScroll.className = "";
         }
    }

    handleclickuser(key, color, event) {
        event.preventDefault();

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
    _submit(event) {
        event.preventDefault();

        var users;      
        var listusers = [];

        var color = this.state.color;
        var userid = this.state.userid;
        console.log("color - ", color);
        if(color !=null){
            each(color, (color, key) => {
                if(color) {
                    users = userid[key];
                    listusers.push(users);

                }
            });
        }else{
            var id = window.localStorage.getItem("UserLoggedId");
            users= id;
            listusers.push(users);
        }

        console.log("USERS - ", users);
        let user = [];
        user = listusers;
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
        dispatch(postevent(form, token));
        setTimeout(() => {this.setState({msg: this.props.msg, data:this.props.data});}, 500);
        setTimeout(() => {
            //console.log("EVENTS DATA", this.state.data);
            each(user, (user, key) => {
                console.info("USERS - ", user, user[key]);
                const {dispatch} = this.props;
                dispatch(addUserToEvent(this.state.data.id, user[key], token));
            });
        }, 500);
        setTimeout(() => {this.setState({showModal: false}, this.props.data);}, 500);
    }
}

Agend.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {

    return {events: state.events, usersfamily: state.userslist.users, msg: state.events.msgadd, data: state.events.dataadd, users:state.userslist.userslist};
}
export default connect(mapStateToProps)(Agend);

