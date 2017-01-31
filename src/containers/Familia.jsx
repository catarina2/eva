import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


import {postInviteToFamily, fetchFamily} from '../actions';

class Familia extends Component {


    constructor(props) {
        super(props);

        this._submitedit = this._submitedit.bind(this);

        this.state = {
            user: {name: null, family_id: null, birthday:null, color:null, email: null, password: null},
            showEdit: 'show'
        }
    }

    componentDidMount() {
        // console.log('componentdidMount');
        const {dispatch} = this.props;
        dispatch(fetchFamily(2));
    }

    render() {
        //console.log('Definições de perfil');

            console.log('Definições de perfil');
            var showedit;
            showedit = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content  modal-contentperfil">
                            <div className="modal-header modal-headerperfil">
                                <button className="btn btn-default" onClick={this.handleEdit}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Enviar Convite</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submitedit}  encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-xs-1">
                                            <button type="button" className="btn btn-editname"></button>
                                        </div>
                                        <div className="col-xs-10">
                                            <h4 >E-mail do Utilizador</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="email" name="email"/>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <div className="row">
                                            <div className="col-xs-2">
                                            </div>
                                            <div className="col-xs-8">
                                                <Link to={`/`}>
                                                    <button className="btn logolistsmallperfil"></button>
                                                </Link>
                                            </div>
                                            <div className="col-xs-2">
                                                <button type="submit" className="btn submitperfil"></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );

        var user = this.props.users;
        console.log(user);
        var coloruser;
        if(user)
        {
            this.state.user = user[3];

            if(this.state.user.color === 'pink') {coloruser = <label className="userpink"></label>};
            if(this.state.user.color === 'blue') {coloruser = <label className="userblue"></label>};
            if(this.state.user.color === 'green') {coloruser = <label className="usergreen"></label>};
            if(this.state.user.color === 'red') {coloruser = <label className="userred"></label>};

        }

        return (

                        showedit
        );

    }

    _submitedit(event) {
        event.preventDefault();

        let obj = {};

        obj['family_id'] = 2;
        obj['created_by'] = 2;
        obj['email'] = this.refs.email.value;



        const {dispatch} = this.props;
        dispatch(postInviteToFamily(this.state.user.id, obj));
    }


}

const mapStateToProps = (state, ownProps) => {
    console.info('container DEF mapStateToProps', state, ownProps );
    console.log(state.userslist.users, 'fgdfxgsdfgdgf users');
    return {family:state.userslist.family};
}

export default connect(mapStateToProps)(Familia);

