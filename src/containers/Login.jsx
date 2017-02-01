import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { each } from 'lodash';

import {postRegistar} from '../actions';

class Login extends Component {

   constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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

        if(this.state.showHideSidenav === true)
        {
          var showmodal;
          showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleClick}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Registar</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submit}  encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-edit"></button>
                                        </div>
                                        <div className="col-xs-10">
                                             <h4 >Nome:</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-people"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Email:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-people"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Password:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                        </div>
                                    </div>
                                   <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-people"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Cor do Avatar:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" maxLength="20"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-people"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4>Data de Nascimento:</h4>
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
        
        return(
                <div className="pageinitial">
                   <div className="container">
                       <div className="evalogin">eva</div>
                       {showmodal}
                       <div className="sloganinitial">Environmental Virtual Assistant</div>
                       <div className="container logineva">
                           <hr  className="classhrinitial"/>
                            <button className="btn btn-login" onClick={this.handleClick}>Registar </button>
                           <hr  className="classhrinitial"/>
                           <hr  className="classhrinitial"/>
                           <a href="http://develop.mmota.online/oauth/authorize?client_id=1&redirect_uri=http://localhost:3000/callback&response_type=code&scope">
                                 <button className="btn btn-login">Login </button>
                           </a>
                           <hr  className="classhrinitial"/>
                        </div>
                    </div>
                </div>
        );
        
    }
    handleClick(){

        var css = (this.state.showHideSidenav === false) ? true : false;
        this.setState({showHideSidenav:css});
    }

     _submit(event) {
        event.preventDefault();
        console.log(this.props)
        var code = "qfmi0YV14e593d1c7cffde1fhN4gb05Y";
        var FormData = require('form-data');
        const form = new FormData();
        form.append('name', "Catarina");
        form.append('email', "catarinamaria2@ua.pt");
        form.append('password', "xptoxpto");
        form.append('password_confirmation', "xptoxpto");
        form.append('birthday', "22/09/2016");
        form.append('color', "1_red");
        form.append('code', code);
        const {dispatch} = this.props;
        dispatch(postRegistar(form));

    }
}



Login.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.lists;
}

export default connect(mapStateToProps)(Login);
