import React, {Component} from 'react';
import {connect} from 'react-redux';

import {postContact} from '../actions';

class Add extends Component {
    constructor(props) {
        super(props);
        this._submit = this._submit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this._submit = this._submit.bind(this);

        this.state = {
            showHideSidenav: 'hidden',
            showModal: false,
            showpanel: false,
            lc: this.props.lc
        }
    }

    render() {
        // console.info('container Add', this.props);
        return (
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
        )
    }

    handleModal(){
        console.log(this.props, 'handleclick');
        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css});
    }

    _submit(event) {
        event.preventDefault();
        var add = {
            name: this.refs.name.value,
            users: [],
            produtos:[]
        };
            
        var l = this.state.lc;
        l.push(add);

        console.log(l);

        this.setState({lc: l, showModal: false});  

    }
}

export default connect()(Add);
