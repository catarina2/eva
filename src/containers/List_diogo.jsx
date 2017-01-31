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

        var bodyScroll = document.getElementById("body");
        bodyScroll.className = "";

        this.state = {
            showHideSidenav: 'hidden',
            showModal: false,
            showpanel: false,
            checked1: "checked",
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,

            color:[],
            pink: false,
            blue: false,
            green: false,
            red: false,
            yellow:false,

            ccolor:[],
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
             showNav =
            <div className="modal">
              <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                <ul className="nav sidebar-nav">
                  <li className="sidebar-brand">
                    <Link to={`calendar`}>
                    <div className="row menu-lat">
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
                    <div className="row menu-lat">
                      <div className="col-xs-2">
                        <input type="button" className="btn btn-smlist" />
                      </div>
                      <div className="col-xs-10 hamburguer">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.handleClick}><h3><b>Lista de Compras</b></h3></a>
                        <li className="col-xs-12 dropdown">
                          <div className="dropownsize font-medium" onClick={this.handleModal}><b>Nova Lista</b></div>
                        </li>
                      </div>
                    </div>
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

        if(this.state.showModal === true)
        {
            var userslist=[];

            var family = this.props.users;
            //console.log(this.props.users, 'usersfamily');
            //console.log(family, 'tamanho usersfamily');
            var count=family.length;

                for (var i = 0; i < count; i++) {

                    console.log("Family -------- ", family[i].color, family[i].id, i);
                    var usercolor='user'+family[i].color;
                    var className;
                    var check =family[i].color;
                    var color=this.state.color;
                    console.log(color);
                    console.log("STATE - ", color);
                    color.push(false);
                    console.log("STATE - ", color);
                    var ccolor=this.state.ccolor;
                    ccolor.push({usercolor: usercolor});

                    this.state.color = color;
                    this.state.ccolor = ccolor;

                    console.log("ARRAYS - ", this.state.color, this.state.ccolor);

                    userslist.push(
                        <div className="cc-selector" key={family[i].id}>
                            <input id={usercolor} type="radio" name={usercolor} ref={usercolor} value={family[i].id} defaultChecked={check}/>
                            <label className={usercolor} htmlFor={usercolor} onClick={this.handleiconclick.bind(this, i, check)}></label>
                        </div>
                    );
                    console.log("Family -------- ", userslist);
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
                                            <div className="validation">{this.state.name}</div>
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
                                            <div className="validation">{this.state.user}</div>
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
                                    <div className="row cc-selector display">
                                        <div className="col-xs-2 icon">
                                                 <input id="icon1" type="radio" name="icon1" ref="icon1" value="trabalho" checked={this.state.checked1}/>
                                                 <label className="icon-cc btn-icon1" htmlFor="icon1"  onClick={this.handleiconclick1}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon2" type="radio" name="icon2" ref="icon2" value="natal" checked={this.state.checked2}/>
                                                 <label className="icon-cc btn-icon2" htmlFor="icon2"  onClick={this.handleiconclick2}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon3" type="radio" name="icon3" ref="icon3" value="prenda" checked={this.state.checked3}/>
                                                 <label className="icon-cc btn-icon3" htmlFor="icon3"  onClick={this.handleiconclick3}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon4" type="radio" name="icon4" ref="icon4" value="ovo" checked={this.state.checked4}/>
                                                 <label className="icon-cc btn-icon4" htmlFor="icon4" onClick={this.handleiconclick4}></label>
                                        </div>
                                        <div className="col-xs-2 icon">
                                                 <input id="icon5" type="radio" name="icon5" ref="icon5" value="ferias" checked={this.state.checked5}/>
                                                 <label className="icon-cc btn-icon5" htmlFor="icon5" onClick={this.handleiconclick5}></label>
                                        </div>
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

        //console.log(this.state, 3);
       
        return (
            <div>
                <header id="header" className="header header-list">
                    <div className="container">
                    <div className="menu-title font-large">Lista de Compras</div>
                        {showNav}
                        {showmodal}
                    </div>
                </header>
                <section>
                        <ListComponent lists={this.props.lists.lists} users={this.props.users} />
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

        var bodyScroll = document.getElementById("body");
        if(this.state.showHideSidenav == "hidden"){
            bodyScroll.classList.add("body-stop-scroll");
        } else{
            bodyScroll.className = "";

        }

        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});
    }

    handleModal(){
        var bodyScroll = document.getElementById("body");

        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css, showHideSidenav: 'hidden', checked1: false, checked2: false, checked3: false, checked4: false, checked5: false, checked6: false,  checkedu1: false, checkedu2: false, checkedu3: false, checkedu4: false });

        if(this.state.showModal == false){
            setTimeout(() => {
                bodyScroll.classList.add("body-stop-scroll");
            }, 500);
        } else{
            bodyScroll.className = "";
        }
    }

    _submit(event) {
        event.preventDefault();
        var ref;
        var users; //{name:this.state.family.name, color:"red"};
        var listusers = [];
        //console.log(this.state.checked1, this.state.checked2, this.state.checked3, this.state.checked4, this.state.checked5, this.state.checked6, 'icons');
        if(this.state.checked1 === "checked") ref=this.refs.icon1.value;
        else if(this.state.checked2 === "checked") ref=this.refs.icon2.value;
        else if(this.state.checked3 === "checked") ref=this.refs.icon3.value;
        else if(this.state.checked4 === "checked") ref=this.refs.icon4.value;
        else if(this.state.checked5 === "checked") ref=this.refs.icon5.value;
        else if(this.state.checked6 === "checked") ref=this.refs.icon6.value;

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
        console.log('lista de utilizadores', user);
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
        var css = (this.state.checked1 === false) ? "checked" : false;
        this.setState({checked1:css, checked2:false, checked3:false, checked4:false,checked5:false,checked6:false});
    }

    handleiconclick2(event) {
        event.preventDefault();
        var css = (this.state.checked2 === false) ? "checked" : false;
        this.setState({checked2:css, checked1:false, checked3:false, checked4:false,checked5:false,checked6:false});
    }

    handleiconclick3(event) {
        event.preventDefault();
        var css = (this.state.checked3 === false) ? "checked" : false;
        this.setState({checked3:css, checked2:false, checked1:false, checked4:false,checked5:false,checked6:false});
    }

    handleiconclick4(event) {
        event.preventDefault();
        var css = (this.state.checked4 === false) ? "checked" : false;
        this.setState({checked4:css, checked2:false, checked3:false, checked1:false,checked5:false,checked6:false});
    }

    handleiconclick5(event) {
        event.preventDefault();
        var css = (this.state.checked5 === false) ? "checked" : false;
        this.setState({checked5:css, checked2:false, checked3:false, checked4:false,checked1:false,checked6:false});
    }

    handleiconclick6(event) {
        event.preventDefault();
        var css = (this.state.checked6 === false) ? "checked" : false;
        this.setState({checked6:css, checked2:false, checked3:false, checked4:false,checked5:false,checked1:false});
    }

    handleiconclick(id, check) {
        event.preventDefault();
        console.log("PRAMS ----", "ID - ",id,"CHECK -", check);

        console.log('handleclickuser FUNCTION', this.state.color[id], this.state.ccolor[id]);

        var css = (this.state.color[id] == false) ? true : false;
        var usercolor = (this.state.ccolor[id] === 'user'+check) ? 'guser'+check : 'user'+check;

        var colors=this.state.color[id];
        colors=(css);
        var ccolor=this.state.ccolor[id];
        ccolor=(usercolor);

        console.log('handleclickuser FUNCTION', colors, ccolor);

        this.setState({color:colors, ccolor:ccolor});
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
    lists: PropTypes.object,
    usersfamily: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    //console.info('container List mapStateToProps', state, ownProps);
   // console.log(state.users, 'fgdfxgsdfgdgf users');
    return {lists: state.lists, usersfamily: state.userslist, msg: state.lists.msgadd, data: state.lists.dataadd, users:state.userslist.users};
}

export default connect(mapStateToProps)(List);
