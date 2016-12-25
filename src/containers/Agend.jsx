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
        this.state = {
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
        console.log(this.state.selectedDay, "lalalallalalalaal");
        var fullDate = this.state.month;
        var weekday = new Array(7);
                weekday[0] =  "Domingo";
                weekday[1] = "Segunda-feira";
                weekday[2] = "Terça-feira";
                weekday[3] = "Quarta-feira";
                weekday[4] = "Quinta-feira";
                weekday[5] = "Sexta-feira";
                weekday[6] = "Sábado";
        var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : (fullDate.getMonth()+1);
        var n = weekday[fullDate.getDay()];
        var currentDate = fullDate.getDate()+n;
        let currentDate1=null;
        if(this.state.selectedDay!==null)
        {
            var fullDate1 = this.state.selectedDay;
            var twoDigitMonth1 = ((fullDate1.getMonth().length+1) === 1)? (fullDate1.getMonth()+1) : (fullDate1.getMonth()+1);
            var n1 = weekday[fullDate1.getDay()];
            currentDate1 = fullDate1.getDate()+n1;
        }
        var show;
        console.log(this.state.cd);
        if(this.state.showev === false)
        {
                show = <p>Não existe nenhum evento neste dia</p>;
                
        }
        else{
                
                console.log(this.state.cd, "lista eventos");
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
            showNav = <div className="modal">
                        <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation" >
                        <ul className="nav sidebar-nav">
                            <li className="sidebar-brand">
                                <div className="row">
                                    <div className="col-xs-2">
                                         <input type="button" className="btn btn-smlist" />
                                    </div>
                                    <div className="col-xs-10 hamburguer" onClick={this.handleClick}>
                                        <h3><b>Agenda</b> Familiar</h3>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown">
                                <Link to={`/list`}>
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
                                    <Link to={`/definition`}>
                                        <div className="row">
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

        return (
            <div>
                <header className="header-agend">
                    <div className="container">
                    <h2><b>Agenda </b>Familiar</h2>
                        {showNav}
                        <button className="btn setaagend"></button>
                    
                    </div>
                </header>
                <section>
                        <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <DayPicker selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) } onDayClick={ this.handleDayClick } />
                            </div>
                        </div>
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
                                <button className="btn btn-newagend"></button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    	);
    }

    handleDayClick(e, day) {
        console.log(e, this.state.ev, 'lalalalallala');

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
        console.log(this.state.showev, 'mes');
        this.setState({selectedDay:day});
    }
    handleClick(){
        console.log(this.props, 'handleclick');
        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});
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

