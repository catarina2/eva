import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { each } from 'lodash';

import {postRegistar} from '../actions';

class Register extends Component {

   constructor(props) {
        super(props);
        this._submit = this._submit.bind(this);

        this.state = {
          showHideSidenav: false,
        }
    }

    componentDidMount() {
       // console.log('componentdidMount');
        const {dispatch} = this.props;
    }

    render() {
          var showmodal;
          showmodal = (
               <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content modal-contentregister">
                            <div className="modal-header modal-headerregister">
                                <h4 className="modal-title"><b>Novo Evento</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submit}  encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-xs-12">
                                             <h4 >Nome:</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Email:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="email" name="email" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Password:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="password" className="form-control" ref="password" name="password" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Confirme Password:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="password" className="form-control" ref="passwordconfirm" name="passwordconfirm" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Data de Nascimento:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="date" className="form-control" ref="birthday" name="birthday" maxLength="20"/>
                                        </div>
                                    </div>
                                   <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Cor do Avatar:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Avatar:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                        </div>
                                    </div>
                                     <div className="modal-footer">
                                        <div className="row">
                                            <div className="col-xs-2">
                                            </div>
                                            <div className="col-xs-8">
                                            </div>
                                            <div className="col-xs-2">
                                                <button type="submit" className="btn submitreg"></button>
                                            </div>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        
        return(<div>
                <div className="pageinitial">
                   <div className="container">
                       {showmodal}
                       
                    </div>
                </div>
                </div>
        );
        
    }

     _submit(event) {
        event.preventDefault();
        console.log(this.props)
        var code = "";
        var FormData = require('form-data');
        const form = new FormData();
        form.append('name', "Catarina");
        form.append('email', "catarinamaria4@ua.pt");
        form.append('password', "xptoxpto");
        form.append('password_confirmation', "xptoxpto");
        form.append('birthday', "22/09/2016");
        form.append('color', "1_red");
        form.append('code', code);
        const {dispatch} = this.props;
        dispatch(postRegistar(form));

    }
}



Register.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.lists;
}

export default connect(mapStateToProps)(Register);