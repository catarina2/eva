import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DayPicker, { DateUtils } from 'react-day-picker';
import Event from '../components/Event';

import 'react-day-picker/lib/style.css';

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
        this.state = {
            checkedu1: false,
            checkedu2: false,
            checkedu3: false,
            checkedu4: false,
            showModal: false,
            showHideSidenav: "hidden",
            selectedDay: null,
            day: null,
            month: new Date(),
            cd: null,
            showev: false,
            family: {name:"martinho", users: [{name: "marta", color: "blue"}, {name: "catarina", color: "green"}, {name: "diogo", color: "pink"}, {name: "martinho", color:"red"}]},
            ev: [{day:"11-1-2017",users:[{name: "martinho", color:"red"},{name: "marta", color: "blue"}, {name: "catarina", color: "green"}], hour:"20h",note:"Jantar de raparigas",location:"Cais Madeirense"}, {day:"11-1-2017",users:[{name: "martinho", color:"red"},{name: "marta", color: "blue"}, {name: "catarina", color: "green"}], hour:"21h",note:"Jantar de raparigas",location:"Petiscos"},{day:"10-1-2017",users:[{name: "martinho", color:"red"},{name: "marta", color: "blue"}, {name: "catarina", color: "green"}], hour:"20h",note:"Jantar de raparigas",location:"Cais Madeirense"}]
           }
    }
    render(){
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
                                <div>
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

            var userslist;
            if(this.state.family.users.length === 2)
            {
               userslist= ( <div className="cc-selector">
                                     <input id="user4" type="radio" name="user4" ref="user4" value={this.state.family.users[0].name} checked={this.state.checkedu1}/>
                                     <label className="user-cc btn-user4" For="user4" onClick={this.handleiconclicku1}></label>
                            </div>);
            }
            else if(this.state.family.users.length === 3)
            {
               userslist= ( <div className="cc-selector">
                                     <input id="user4" type="radio" name="user4" ref="user4" value={this.state.family.users[0].name} checked={this.state.checkedu1}/>
                                     <label className="user-cc btn-user4" For="user4" onClick={this.handleiconclicku1}></label>
                                     <input id="user2" type="radio" name="user2" ref="user2" value={this.state.family.users[1].name} checked={this.state.checkedu2}/>
                                     <label className="user-cc btn-user2" For="user2" onClick={this.handleiconclicku2}></label>
                            </div>);
            }
            else if(this.state.family.users.length === 4)
            {
               userslist= ( <div className="cc-selector">
                                     <input id="user4" type="radio" name="user4" ref="user4" value={this.state.family.users[0].name} checked={this.state.checkedu1}/>
                                     <label className="user-cc btn-user4" For="user4" onClick={this.handleiconclicku1}></label>
                                     <input id="user2" type="radio" name="user2" ref="user2" value={this.state.family.users[1].name} checked={this.state.checkedu2}/>
                                     <label className="user-cc btn-user2" For="user2" onClick={this.handleiconclicku2}></label>
                                     <input id="user3" type="radio" name="user3" ref="user3" value={this.state.family.users[2].name} checked={this.state.checkedu3}/>
                                     <label className="user-cc btn-user3" For="user3" onClick={this.handleiconclicku3}></label>
                            </div>);
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
                                  <form id="form" method="POST" onSubmit={this._submit}>
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
                                            <input type="text" className="form-control" ref="name" name="name" placeholder="DD-M-YYYY" />
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
                                          {userslist}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-hour"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Hora do Evento</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="hour" name="name" />
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
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-note"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Adicionar Nota</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="note" name="name" />
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
                                <DayPicker selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) } onDayClick={ this.handleDayClick } />
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
                                 <button className="btn btn-imageclassagend"></button>
                            </div>
                            <div className="col-xs-8">
                                <Link to={`/`}>
                                    <button className="btn logoagend"></button>
                                </Link>
                            </div>
                            <div className="col-xs-2">
                                <button className="btn btn-newagend" onClick={this.handleModal}></button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    	);
    }

    handleDayClick(e, day) {
        var fullDate = day;
        var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : (fullDate.getMonth()+1);
        var currentDate = fullDate.getDate()+ "-"+twoDigitMonth+"-"+day.getFullYear();
        var ev = [];
        this.state.ev.map((i, key) => {
            if(currentDate=== i.day)
            {
                ev.push(i);
            }
            
        })

        if(ev.length === 0)
        {
            this.setState({showev:false});
        }
        else
        {
            this.setState({showev:true, cd:ev});
        }
        this.setState({selectedDay:day});
    }
    handleClick(){
        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});
    }
     handleModal(){
        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css, showHideSidenav: 'hidden'});
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

        var users = {name:this.state.family.name, color:"red"};
        var listusers = [];
        listusers.push(users);

        if(this.refs.user4.checked) {
                users = {name: this.refs.user4.value, color:"pink"};
                listusers.push(users);
            }
        if(this.refs.user2.checked) {
                users = {name: this.refs.user2.value,  color:"green"};
                listusers.push(users);
            }
        if(this.refs.user3.checked) {
                users = {name: this.refs.user3.value, color:"blue"};
                listusers.push(users);
            }
        var add = {
            day: this.refs.name.value,
            users: listusers,
            location: this.refs.location.value,
            note: this.refs.note.value,
            hour: this.refs.hour.value
        };
            
        var l = this.state.ev;
        l.push(add);

        this.setState({ev: l, showModal: false, checkedu1: false, checkedu2: false, checkedu3: false, checkedu4:false});  

    }
}

Agend.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.contacts;
}

export default connect(mapStateToProps)(Agend);

