import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ListComponent from '../components/List';
import {fetchLists, postLists, fetchFamilyUsers} from '../actions';

class List extends Component {
    componentDidMount() {
       // console.log('componentdidMount');
        const {dispatch} = this.props;
        dispatch(fetchLists());
        dispatch(fetchFamilyUsers(2));
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleiconclick1 = this.handleiconclick1.bind(this);
        this.handleiconclick2 = this.handleiconclick2.bind(this);
        this.handleiconclick3 = this.handleiconclick3.bind(this);
        this.handleiconclick4 = this.handleiconclick4.bind(this);
        this.handleiconclick5 = this.handleiconclick5.bind(this);
        this.handleiconclick6 = this.handleiconclick6.bind(this);
        this.handleiconclickpink = this.handleiconclickpink.bind(this);
        this.handleiconclickred = this.handleiconclickred.bind(this);
        this.handleiconclickblue = this.handleiconclickblue.bind(this);
        this.handleiconclickgreen = this.handleiconclickgreen.bind(this);
        this.handleiconclickyellow = this.handleiconclickyellow.bind(this);
        this._submit = this._submit.bind(this);

        this.state = {
            showHideSidenav: 'hidden',
            showModal: false,
            showpanel: false,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
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
            msg: null,
            name: null,
            user: null,
            family: {name:"martinho", users: [{name: "marta", color: "blue"}, {name: "catarina", color: "green"}, {name: "diogo", color: "pink"}, {name: "martinho", color:"red"}]},
            lc: [{name: "Casa", icon: "casa", users: [{name:'martinho', color: "red"}, {name:'marta', color:"blue"}], produtos: [{name: "Maça", quant: "3 peças", desc: "maças amarelas"}, {name: "Cogumelos", quant:"3 latas", desc: "cogumelos laminados"} ]}, 
                  {name: "Trabalho", icon: "trabalho",users: [{name:'martinho', color: "red"},{name:'catarina', color:"green"}, {name:'marta', color: "blue"}], produtos:[]}, 
                  {name: "Natal", icon:"natal", users: [{name:'martinho', color: "red"}], produtos: []}],
        }
    }

    render() {
        var showNav;
        var showmodal;
       // console.log(this.props);
       if(this.state.msg === 'OK')
       {
          this.state.showModal = false;
          this.state.msg = null;
          this.state.pink =  false;
           this.state.blue = false;
           this.state.green =  false;
           this.state.red =  false;
           this.state.yellow =  false;
            this.state.cpink =  'userpink';
           this.state.cblue = 'userblue';
           this.state.cgreen =  'usergreen';
           this.state.cred =  'userred';
           this.state.cyellow =  'useryellow';
           this.state.name = null;
          this.state.user =null;
          //setTimeout(() => {this.setState({showModal: false})}, 500)
       }
       if(this.state.msg === 'NOK')
       {
        //console.log(this.props);
          if(this.props.data.length === 1) {
               if(this.props.data[0].indexOf("users") === -1){
                this.state.name = this.props.data[0];
                this.state.user = null;
               }
               else {
                this.state.name = null;
                this.state.user = this.props.data[0];
               }
              
          }
          if(this.props.data.length === 2) {
            this.state.name = this.props.data[0];
            this.state.user = this.props.data[1];
          }
          
          
          //setTimeout(() => {this.setState({showModal: false})}, 500)
       }


        if(this.state.showHideSidenav === 'hidden')
        {
            showNav = <button type="button" className="btn btn-list" aria-label="Left Align" onClick={this.handleClick}>
                            <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                        </button>;
        }
        else {
            showNav = <div className="modal">
                        <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation" >
                        <ul className="nav sidebar-nav">
                            <li className="sidebar-brand">
                                    <Link to={`calendar`}>
                                        <div className="row">
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
                                <div className="row">
                                    <div className="col-xs-2">
                                         <input type="button" className="btn btn-smlist" />
                                    </div>
                                    <div className="col-xs-10 hamburguer">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.handleClick}><h3><b>Lista de Compras</b></h3> <span className="caret"></span></a>
                                        <ul className="dropdown-menu" role="menu">
                                            <li className="dropdown"><h3 className="dropownsize" onClick={this.handleModal}><b>Nova Lista</b></h3></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                    <Link to={`mirror`}>
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
                                    <Link to={`definition`}>
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

        if(this.state.showModal === true)
        {
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
                                            <input type="text" className="form-control" ref="name" name="name" />
                                            {this.state.name}
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
                                          {userslist}
                                        </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-xs-12">
                                            {this.state.user}
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

        //console.log(this.props, 3);
       
        return (
            <div>
                <header className="header header-list">
                    <div className="container">
                    <div className="menu-title font-large">Lista de Compras</div>
                        {showNav}
                        {showmodal}
                    </div>
                </header>
                <section>
                        <ListComponent lists={this.props.lists.lists} />
                </section>        
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-2">
                                 <button className="btn btn-imageclass"></button>
                            </div>
                            <div className="col-xs-8">
                                <Link to={`/`}>
                                    <button className="btn logolist"></button>
                                </Link>
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

    handleClick(){
        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});
    }

    handleModal(){
        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css, showHideSidenav: 'hidden', checked1: false, checked2: false, checked3: false, checked4: false, checked5: false, checked6: false,  checkedu1: false, checkedu2: false, checkedu3: false, checkedu4: false });
    }

    _submit(event) {
        event.preventDefault();
        var ref;
        var users; //{name:this.state.family.name, color:"red"};
        var listusers = [];
        //console.log(this.state.checked1, this.state.checked2, this.state.checked3, this.state.checked4, this.state.checked5, this.state.checked6, 'icons');
        if(this.state.checked1) ref=this.refs.icon1.value;
        else if(this.state.checked2) ref=this.refs.icon2.value;
        else if(this.state.checked3) ref=this.refs.icon3.value;
        else if(this.state.checked4) ref=this.refs.icon4.value;
        else if(this.state.checked5) ref=this.refs.icon5.value;
        else if(this.state.checked6) ref=this.refs.icon6.value;

        //console.log(this.state.red);
        if(this.state.pink) {
                users = this.refs.userpink.value;
                listusers.push(users);
            }
        if(this.state.red) {
                users = this.refs.userred.value;
                listusers.push(users);
            }
        if(this.state.blue) {
                users = this.refs.userblue.value;
                listusers.push(users);
            }
        if(this.state.green) {
                users = this.refs.usergreen.value;
                listusers.push(users);
            }
         if(this.state.yellow) {
                users = this.refs.useryellow.value;
                listusers.push(users);
            }
        let user = [];
        user = listusers;
      
        //console.log(temp, 'lista de utiliza<dores');       
        let add = {
            name: this.refs.name.value,
            icon: ref,
            users: listusers
           // produtos:[]
        };

        var FormData = require('form-data');
        const form = new FormData();
        form.append('name', this.refs.name.value);
        form.append('icon', ref);
        form.append('users', user);
        const {dispatch} = this.props;
        dispatch(postLists(form));
        setTimeout(() => {this.setState({msg: this.props.msg})}, 500);

    }

    handleiconclick1(event) {
        event.preventDefault();
        var css = (this.state.checked1 === false) ? true : false;
        this.setState({checked1:css, checked2:false, checked3:false, checked4:false,checked5:false,checked6:false});
    }

    handleiconclick2(event) {
        event.preventDefault();
        var css = (this.state.checked2 === false) ? true : false;
        this.setState({checked2:css, checked1:false, checked3:false, checked4:false,checked5:false,checked6:false});
    }

    handleiconclick3(event) {
        event.preventDefault();
        var css = (this.state.checked3 === false) ? true : false;
        this.setState({checked3:css, checked2:false, checked1:false, checked4:false,checked5:false,checked6:false});
    }

    handleiconclick4(event) {
        event.preventDefault();
        var css = (this.state.checked4 === false) ? true : false;
        this.setState({checked4:css, checked2:false, checked3:false, checked1:false,checked5:false,checked6:false});
    }

    handleiconclick5(event) {
        event.preventDefault();
        var css = (this.state.checked5 === false) ? true : false;
        this.setState({checked5:css, checked2:false, checked3:false, checked4:false,checked1:false,checked6:false});
    }

    handleiconclick6(event) {
        event.preventDefault();
        var css = (this.state.checked6 === false) ? true : false;
        this.setState({checked6:css, checked2:false, checked3:false, checked4:false,checked5:false,checked1:false});
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


}

List.propTypes = {
    lists: PropTypes.array, 
    usersfamily: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    console.info('container List mapStateToProps', state, ownProps);
   // console.log(state.users, 'fgdfxgsdfgdgf users');
    return {lists: state.lists, usersfamily: state.userslist, msg: state.lists.msgadd, data: state.lists.dataadd, users:state.userslist.users};
}

export default connect(mapStateToProps)(List);
