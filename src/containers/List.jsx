import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ListComponent from '../components/List';
import {Link} from 'react-router';

class List extends Component {
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
        this.handleiconclicku1 = this.handleiconclicku1.bind(this);
        this.handleiconclicku2 = this.handleiconclicku2.bind(this);
        this.handleiconclicku3 = this.handleiconclicku3.bind(this);
        this.handleiconclicku4 = this.handleiconclicku4.bind(this);
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
            checkedu1: false,
            checkedu2: false,
            checkedu3: false,
            checkedu4: false,
            family: {name:"martinho", users: [{name: "marta", color: "blue"}, {name: "catarina", color: "green"}, {name: "diogo", color: "pink"}, {name: "martinho", color:"red"}]},
            lc: [{name: "Casa", icon: "casa", users: [{name:'martinho', color: "red"}, {name:'marta', color:"blue"}], produtos: [{name: "Maça", quant: "3 peças", desc: "maças amarelas"}, {name: "Cogumelos", quant:"3 latas", desc: "cogumelos laminados"} ]}, 
                  {name: "Trabalho", icon: "trabalho",users: [{name:'martinho', color: "red"},{name:'catarina', color:"green"}, {name:'marta', color: "blue"}], produtos:[]}, 
                  {name: "Natal", icon:"natal", users: [{name:'martinho', color: "red"}], produtos: []}],
        }
    }

    render() {
        const {isFetching, items} = this.props;
        const htmlContent = isFetching ? <p>Loading...</p> : <ListComponent items={this.state.lc} />;
        var showNav;
        var showmodal;

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
                                    <Link to={`/agend`}>
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
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.handleClick}><h3><b>Lista de Compras</b></h3> <span class="caret"></span></a>
                                        <ul class="dropdown-menu" role="menu">
                                            <li className="dropdown"><h3 className="dropownsize" onClick={this.handleModal}><b>Nova Lista</b></h3></li>
                                        </ul>
                                    </div>
                                </div>
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

        if(this.state.showModal === true)
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
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleModal}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Nova Lista</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submit}>
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
                                        <div className="col-xs-10">
                                          {userslist}
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
                                    <div className="row cc-selector">
                                        <div className="col-xs-2">
                                                 <input id="icon1" type="radio" name="icon1" ref="icon1" value="trabalho" checked={this.state.checked1}/>
                                                 <label className="icon-cc btn-icon1" For="icon1" onClick={this.handleiconclick1}></label>
                                        </div>
                                        <div className="col-xs-2">
                                                 <input id="icon2" type="radio" name="icon2" ref="icon2" value="natal" checked={this.state.checked2}/>
                                                 <label className="icon-cc btn-icon2" For="icon2" onClick={this.handleiconclick2}></label>
                                        </div>
                                        <div className="col-xs-2">
                                                 <input id="icon3" type="radio" name="icon3" ref="icon3" value="prenda" checked={this.state.checked3}/>
                                                 <label className="icon-cc btn-icon3" For="icon3" onClick={this.handleiconclick3}></label>
                                        </div>
                                        <div className="col-xs-2">
                                                 <input id="icon4" type="radio" name="icon4" ref="icon4" value="ovo" checked={this.state.checked4}/>
                                                 <label className="icon-cc btn-icon4" For="icon4" onClick={this.handleiconclick4}></label>
                                        </div>
                                        <div className="col-xs-2">
                                                 <input id="icon5" type="radio" name="icon5" ref="icon5" value="ferias" checked={this.state.checked5}/>
                                                 <label className="icon-cc btn-icon5" For="icon5" onClick={this.handleiconclick5}></label>
                                        </div>
                                        <div className="col-xs-2">
                                                 <input id="icon6" type="radio" name="icon6" ref="icon6" value="roupa" checked={this.state.checked6}/>
                                                 <label className="icon-cc btn-icon6" For="icon6" onClick={this.handleiconclick6}></label>
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

        return (
            <div>
                <header className="header-list">
                    <div className="container">
                    <h2>Lista de Compras</h2>
                        {showNav}
                        {showmodal}
                        <button className="btn seta"></button>
                    </div>
                </header>
                <section>
                            <ListComponent items={this.state.lc} />
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
        var users = {name:this.state.family.name, color:"red"};
        var listusers = [];
        listusers.push(users);
        if(this.refs.icon1.checked) ref=this.refs.icon1.value;
        else if(this.refs.icon2.checked) ref=this.refs.icon2.value;
        else if(this.refs.icon3.checked) ref=this.refs.icon3.value;
        else if(this.refs.icon4.checked) ref=this.refs.icon4.value;
        else if(this.refs.icon5.checked) ref=this.refs.icon5.value;
        else if(this.refs.icon6.checked) ref=this.refs.icon6.value;

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
            name: this.refs.name.value,
            icon: ref,
            users: listusers,
            produtos:[]
        };
            
        var l = this.state.lc;
        l.push(add);
        this.setState({lc: l, showModal: false});  

    }

    handleiconclick1(event) {
        event.preventDefault();
        var css = (this.state.checked1 === false) ? true : false;
        this.setState({checked1:css});
        if(this.state.checked1)
        {
            this.setState({checked2:false, checked3:false, checked4:false,checked5:false,checked6:false });
        }
    }

    handleiconclick2(event) {
        event.preventDefault();
        var css = (this.state.checked2 === false) ? true : false;
        this.setState({checked2:css});
        if(this.state.checked2)
        {
            this.setState({checked1:false, checked3:false, checked4:false,checked5:false,checked6:false });
        }
    }

    handleiconclick3(event) {
        event.preventDefault();
        var css = (this.state.checked3 === false) ? true : false;
        this.setState({checked3:css});
        if(this.state.checked3)
        {
            this.setState({checked2:false, checked1:false, checked4:false,checked5:false,checked6:false });
        }
    }

    handleiconclick4(event) {
        event.preventDefault();
        var css = (this.state.checked4 === false) ? true : false;
        this.setState({checked4:css});
        if(this.state.checked4)
        {
            this.setState({checked2:false, checked3:false, checked1:false,checked5:false,checked6:false });
        }
    }

    handleiconclick5(event) {
        event.preventDefault();
        var css = (this.state.checked5 === false) ? true : false;
        this.setState({checked5:css});
        if(this.state.checked5)
        {
            this.setState({checked2:false, checked3:false, checked4:false,checked1:false,checked6:false });
        }
    }

    handleiconclick6(event) {
        event.preventDefault();
        var css = (this.state.checked6 === false) ? true : false;
        this.setState({checked6:css});
        if(this.state.checked6)
        {
            this.setState({checked2:false, checked3:false, checked4:false,checked5:false,checked1:false });
        }
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

}

List.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.contacts;
}

export default connect(mapStateToProps)(List);
