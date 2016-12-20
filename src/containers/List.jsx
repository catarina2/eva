import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button} from 'react-bootstrap';

import ListComponent from '../components/List';

class List extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this._submit = this._submit.bind(this);

        this.state = {
            showHideSidenav: 'hidden',
            showModal: false,
            showpanel: false,
            lc: [{id: 1, name: "Casa", users: {name:'pedro', name:'maria'}, produtos: [{name: "Maça"}, {name: "Cogumelos"} ]}, 
                  {id: 2, name: "Trabalho", users: {name:'pedro', name:'maria'}}, 
                  {id: 3, name: "Natal", users: {name:'pedro', name:'maria'}}],
        }
    }

    render() {
        // console.info('container List', this.props);
        const {isFetching, items} = this.props;
        const htmlContent = isFetching ? <p>Loading...</p> : <ListComponent items={this.state.lc} />;
        var showNav;
        var showmodal;

    if(this.state.showHideSidenav === 'hidden')
        {
            console.log('lalalallalalal');
            showNav = <button type="button" className="btn btn-list" aria-label="Left Align" onClick={this.handleClick}>
                            <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                        </button>;
        }
        else {
            console.log('kahnkdjsfh');

            showNav = <div className="modal">
                        <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                        <ul className="nav sidebar-nav">
                            <li className="sidebar-brand">
                                    <h3><b>Agenda</b> Familiar</h3>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Lista de Compras</b> <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li class="dropdown-header">Dropdown heading</li>
                                    <li><h3><b>Nova Lista</b></h3></li>
                                </ul>
                            </li>
                            <li>
                                    <h3><b>Espelho</b></h3>
                            </li>
                            <li>
                                    <h3><b>Definições</b></h3>
                            </li>
                        </ul>
                    </nav>
                 </div>;

        }

        if(this.state.showModal === true)
        {
            showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleModal}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title">Nova Lista</h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submit}>
                                    <div className="row">
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-11">
                                            <h4>Nome da Lista</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" ref="name" name="name" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-11">
                                            <h4>Convidar pessoas</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Nome da Lista</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-11">
                                            <h4>Alterar Icon</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>ICONS</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-2">
                                        </div>
                                        <div className="col-xs-8">
                                            <h4>logo</h4>
                                        </div>
                                        <div className="col-xs-2">
                                            <button type="submit">Add</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div className="btn-group">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-10"><h1>Lista de Compras</h1></div>
                            <div className="col-xs-2 wrapper">
                                {showNav}
                                {showmodal}
                            </div>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="container">
                        <div className="row">
                            <ListComponent items={this.state.lc} />
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-2">
                                 <div className="image-list">lalalalalalalal</div>
                            </div>
                            <div className="col-xs-8">
                                <div className="logo">eva</div>
                            </div>
                            <div className="col-xs-2">
                                <button className="btn btn-primary" onClick={this.handleModal}>Nova Lista</button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    	);
    }

    handleClick(){
        console.log(this.props, 'handleclick');
        var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
        this.setState({showHideSidenav:css});
    }

    handleModal(){
        console.log(this.props, 'handleclick');
        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css});
    }

    _submit(event) {
        event.preventDefault();
        const form = document.querySelector('#form');
        const data = new FormData(form);
    
        console.log(data, "lalalalkndshlkfirgk");
        const {dispatch} = this.props;
       

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
