import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { each } from 'lodash';

import {postRegistar} from '../actions';

class Register extends Component {

   constructor(props) {
        super(props);
        this.handleclickcolor = this.handleclickcolor.bind(this);
        this.handleclickavatar = this.handleclickavatar.bind(this);
        this._submit = this._submit.bind(this);

        this.state = {
          showHideSidenav: false,
          color:[{color: "blue", classname: "blue"}, {color: "pink",  classname: "pink"}, {color: "green",  classname: "green"}, {color: "red",  classname: "red"}, {color: "yellow",  classname: "yellow"}, {color: "orange",  classname: "orange"}],
          avatar:[{avatar: "1", classname: "smallavatar1", color: "blue"}, {avatar: "2", classname: "smallavatar2", color: "blue"}, {avatar: "3", classname: "smallavatar3", color: "blue"}, {avatar: "4", classname: "smallavatar4", color: "blue"}, {avatar: "5", classname: "smallavatar5", color: "blue"}, {avatar: "6", classname: "smallavatar6", color: "blue"}]
        }
    }

    componentDidMount() {
       // console.log('componentdidMount');
        const {dispatch} = this.props;
    }

    render() {
          var showmodal;
                var colorlist=[];
                var color = this.state.color;
                //  console.log(color, 'cor dos users')
                  var x;
                  each(color, (colorxx, key) => {
                       var colorlosange ="losangecolor"+" "+colorxx.classname;

                       colorlist.push(<div key ={key} className='displayavatares'>
                                        <div className="cc-selectorperfil">
                                        <div className={colorlosange} onClick={this.handleclickcolor.bind(this, key, colorxx.color)}>
                                            <input id={colorxx.color} type="radio" name={colorxx.color} ref={colorxx.color} value={colorxx.color} defaultChecked={colorxx.color}/>
                                        </div>  
                                        </div>
                                      </div>);
                    });

                  var avatarlist=[];
                  var avatar = this.state.avatar;
                  each(avatar, (avatar, key) => {
                        var color = avatar.color;
                        var colorlosange ="losangecolor"+" "+color;
                        var classname ="btn-"+avatar.classname;
                       avatarlist.push(<div key ={key} className='displayavatares' onClick={this.handleclickavatar.bind(this, key, avatar.avatar, color)}>
                                        <div className="cc-selectorperfil">
                                        <div className={colorlosange}>
                                           <div className="loscolor"> <button ref="photo" className={classname}></button></div>
                                        </div>
                                        </div>
                                      </div>);
                    });

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
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-10 displayavatares">
                                          {colorlist}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Avatar:</h4>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-xs-1">
                                        </div>
                                        <div className="col-xs-10 displayavatares">
                                          {avatarlist}
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

     handleclickcolor(key,color,event) {
        event.preventDefault();
        var color = (this.state.color[key].classname === color) ? "g"+color : color;

        var listcolor = [];
        each(this.state.color, (color, key) => {
            if(color.classname === "g"+color.color) {
                var colorx= color.color;
                var t = {};
                t["color"] = color.color
                t["classname"] = color.color;
                
                var c = {};
                c[key] = t;
                listcolor.push(t);
            }
            else{
                var c = {};
                c[key] = color;
                listcolor.push(color);
            }
        });
        var x = {};
        x["color"] = this.state.color[key].color
        x["classname"] = color;

        var xcolor ={};
        xcolor[key] = x;
        var tempcolor = Object.assign(listcolor, xcolor);


        this.setState({color:tempcolor, userlogged: "undefined"});
    }

    handleclickavatar(key, avatar, color, event){
        event.preventDefault();
       // console.log(this.state.avatar, this.state.avatar[key].avatar, avatar)
        var avatar = (this.state.avatar[key].color === "blue") ? "g"+color : "blue";

        var listavatar = [];
        each(this.state.avatar, (avatar, key) => {
            if(avatar.color === "gblue") {
                var t = {};
                t["avatar"] = avatar.avatar
                t["classname"] = avatar.classname;
                t["color"] = "blue";
                
                listavatar.push(t);
            }
            else{
                listavatar.push(avatar);
            }
        });

        var x = {};
        x["avatar"] = this.state.avatar[key].avatar
        x["classname"] = this.state.avatar[key].classname;
        x["color"] = avatar;

        var xavatar ={};
        xavatar[key] = x;

        var tempavatar = Object.assign(listavatar, xavatar);

        this.setState({avatar:tempavatar, userlogged:"undefined"});
    }

     _submit(event) {
        event.preventDefault();
        console.log(this.props)
        var color = this.state.color;
        var coloruser;
        each(color, (color, key) => {
            if(color.color !== color.classname)
                coloruser = color.color;
        });


        var avatar = this.state.avatar;
        //console.log(this.state.avatar, 'avatares submit edit')
        var avataruser;
        each(avatar, (avatar, key) => {
            if(avatar.color === "gblue")
                avataruser = avatar.avatar;
        });
        var code = "";
        var FormData = require('form-data');
        const form = new FormData();
        form.append('name', this.refs.name.value);
        form.append('email', this.refs.email.value);
        form.append('password', this.refs.password.value);
        form.append('password_confirmation', this.refs.passwordconfirm.value);
        form.append('birthday', this.refs.birthday.value);
        form.append('color', coloruser);
        form.append('avatar', avataruser);
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