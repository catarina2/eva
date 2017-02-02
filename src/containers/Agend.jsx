import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DayPicker, { DateUtils } from 'react-day-picker';
import Event from '../components/Event';

import { each } from 'lodash';


import {postevent, fetchUserEvents, fetchFamilyUsers} from '../actions';

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
        this.handleiconclicku1 = this.handleiconclicku1.bind(this);
        this.handleiconclicku2 = this.handleiconclicku2.bind(this);
        this.handleiconclicku3 = this.handleiconclicku3.bind(this);
        this.handleiconclicku4 = this.handleiconclicku4.bind(this);
        this._submit = this._submit.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.onChange= this.onChange.bind(this);
         this.handleEventHour= this.handleEventHour.bind(this);

         var bodyScroll = document.getElementById("body");
         bodyScroll.className = "";

         this.state = {

             loggeduser:3,

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
            family: {name:"martinho", users: [{name: "marta", color: "blue"}, {name: "catarina", color: "green"}, {name: "diogo", color: "pink"}, {name: "martinho", color:"red"}]},
            ev: []
           }

    }

    componentDidMount() {
        // console.log('componentdidMount');
        const {dispatch} = this.props;
        dispatch(fetchFamilyUsers(2));
        dispatch(fetchUserEvents(this.state.loggeduser)); // MUDAR PARA ID FAMILIA  ex: loggeduser.family_id
    }


    render(){

        console.log("VER events em PROPS: ", this.props);

        var ev= this.props.events.events;
        this.state.ev=ev;
        console.log("STATE ev ", ev);

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
        var currentDate = fullDate.getDate()+n;
        let currentDate1=null;
        if(this.state.selectedDay!==null)
        {
            var fullDate1 = this.state.selectedDay;
            var n1 = weekday[fullDate1.getDay()];
            currentDate1 = fullDate1.getDate()+n1;
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
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <li key={key}>
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
            each(family, (user, key) => {
                usercolor = 'user'+ user.color;
                ccolor[key] = usercolor;
                color[key] = false;
                userid[key] = user.id;
                className="user-cc btn-user"+key;

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
                        <input id={userid[key]} type="radio" name={userid[key]} ref={userid[key]} value={user.id} defaultChecked={this.state.checkedu1}/>
                        <label className={className} htmlFor={userid[key]} onClick={this.handleclickuser.bind(this, key, user.color)}></label>
                    </div>
                </div>);
            });
            this.state.ccolor = className;
            this.state.color = colorstate;
            this.state.userid = userid;
            //FINAL USERS

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
                                              <input type="text" className="form-control" ref="title" name="name" />
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
                                          <div className="col-xs-10">
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
                                                <button type="submit" className="btn submitagend"></button>
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
                <header className="header header-agend">
                    <div className="container">
                    <div className="menu-title font-large"><b>Agenda </b>Familiar</div>
                        {showNav}
                        {showmodal}

                    
                    </div>
                </header>
                <section>
                        <div className="">
                            <div className="">
                                <DayPicker selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) } onDayClick={ this.handleDayClick.bind(this) } />
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
                        <hr className="classhr"/>
                        </div>
                </section>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-2">
                            </div>
                            <div className="col-xs-7">
                            </div>
                            <div className="col-xs-3">
                                <button className="btn btn-newagend" onClick={this.handleModal}></button>
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
        console.log("DIA ", Day);
        var currentDate = Day + "/" + twoDigitMonth + "/" + day.getFullYear();
        var ev = [];
        console.log("VAR state.ev ", this.state.ev);
        console.log("VAR currentDate ", currentDate);

        each(this.state.ev, (id, key) => {
            console.log("EACH event ", id.event);

            console.log("VAR i.date ", id.event.date);
            if (currentDate == id.event.date) {
                console.info("VAR i ", id.event);
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
        var usercolor = (this.state.ccolor[key] === 'user'+color) ? 'guser'+color : 'user'+color;

        var xcolor = {};
        xcolor[key] = css;

        var x = {};
        x[key] = usercolor;

        var tempcolor = Object.assign(this.state.color, xcolor);
        var temp = Object.assign(this.state.ccolor, x);

        this.setState({color:tempcolor, ccolor: temp});
    }

    handleiconclicku1(event) {
        event.preventDefault();
        var css = (this.state.checkedu1 === false) ? true : false;
        this.setState({checkedu1:css});
    }

    handleiconclicku2(event) {
        event.preventDefault();
        var css = (this.state.checkedu2 === false) ? true : false;
        this.setState({checkedu2:css});
    }

    handleiconclicku3(event) {
        event.preventDefault();
        var css = (this.state.checkedu3 === false) ? true : false;
        this.setState({checkedu3:css});
    }

    handleiconclicku4(event) {
        event.preventDefault();
        var css = (this.state.checkedu4 === false) ? true : false;
        this.setState({checkedu4:css});
    }
    _submit(event) {
        event.preventDefault();

        var users;      
        var listusers = [];

        if(this.refs.user4.checked) {
                users = this.refs.user4.value;
                listusers.push(users);
            }
        if(this.refs.user2.checked) {
                users = this.refs.user2.value;
                listusers.push(users);
            }
        if(this.refs.user3.checked) {
                users = this.refs.user3.value;
                listusers.push(users);
            }

        let user = [];
        user = listusers;
        console.log("USERS - ", user);

        var FormData = require('form-data');
        const form = new FormData();
        form.append('users', user);
        form.append('date', this.state.startDate && this.state.startDate.format('MM/DD/YYYY'));
        form.append('location', this.refs.location.value);
        form.append('title', this.refs.title.value);
        form.append('start_time', this.state.initialtime && this.state.initialtime.format(str));
        form.append('end_time', this.state.finaltime && this.state.finaltime.format(str));
        form.append('created_by', this.state.loggeduser);

        var add = {
            created_by: this.state.loggeduser,
            users: listusers,
            date: this.state.startDate && this.state.startDate.format('MM/DD/YYYY'),
            location: this.refs.location.value,
            title: this.refs.title.value,
            starttime: this.state.initialtime && this.state.initialtime.format(str),
            endtime: this.state.finaltime && this.state.finaltime.format(str)
        };
        console.log("payload - ", add);
        var l = this.state.ev;
        l.push(add);
        console.log("payload - ", l);
        this.setState({ev: l, showModal: false, checkedu1: false, checkedu2: false, checkedu3: false, checkedu4:false});

        const {dispatch} = this.props;
        dispatch(postevent(form));
    }
}

Agend.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {

    return {events: state.events, usersfamily: state.userslist.users, msg: state.events.msgadd, data: state.events.dataadd, users:state.userslist.userslist};
}
export default connect(mapStateToProps)(Agend);

