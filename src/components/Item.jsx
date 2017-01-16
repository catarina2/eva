import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produtos from './Produtos';
import User from './User';
import {Link} from 'react-router';

import {fetchListUsers} from '../actions';
import {fetchListProducts, deleteLists, editLists} from '../actions';

class Item extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleiconclick1 = this.handleiconclick1.bind(this);
        this.handleiconclick2 = this.handleiconclick2.bind(this);
        this.handleiconclick3 = this.handleiconclick3.bind(this);
        this.handleiconclick4 = this.handleiconclick4.bind(this);
        this.handleiconclick5 = this.handleiconclick5.bind(this);
        this.handleiconclick6 = this.handleiconclick6.bind(this);
        this._submit = this._submit.bind(this);
        this._submitEdit = this._submitEdit.bind(this);
        
        this.state = {
            showpanel: false,
            produtos: null,
            showModalEdit:false, 
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
        }
    }

     componentDidMount() {
          //console.log(this.props.item, 'componentDidMount');
        const {dispatch} = this.props;
        dispatch(fetchListUsers(this.props.list.id));
        dispatch(fetchListProducts(this.props.list.id));
    }

    render() {
        var list = this.props.list;
        var panel = null;

        if(this.state.showpanel === true)
        {
            panel = <Produtos id={list.id} />;
        }
        var icon;
        if(list.icon === "casa"){
                    icon= <button className="btn casa list-icon"></button>;
        }
        else if (list.icon === "trabalho")
        {
                    icon= <button className="btn trabalho list-icon"></button>;
        }
        else if (list.icon === "natal")
        {
                    icon= <button className="btn natal list-icon"></button>;
        }
        else if (list.icon === "prenda")
        {
                    icon= <button className="btn prenda list-icon"></button>;
        }
        else if (list.icon === "ovo")
        {
                    icon= <button className="btn ovo list-icon"></button>;
        }
        else if (list.icon === "ferias")
        {
                    icon= <button className="btn ferias list-icon"></button>;
        }
        else if (list.icon === "roupa")
        {
                    icon= <button className="btn roupa list-icon"></button>;
        }

        var showedit;
        console.log(this.state.showModalEdit);
        if(this.state.showModalEdit)
        {
             showedit = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleEdit}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Lista {list.name}</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submitEdit}  encType="multipart/form-data">
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
                                            <input type="text" className="form-control" ref="name" name="name" defaultValue={list.name} />
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
                                         
                                        </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-xs-12">
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


        return (
                    <div className="panel panel-primary" >
                        <div className="panelrow">
                            <div className="panel-heading">
                            {icon}
                                <div className="panel-title" onClick={this.handleClick}>
                                    <div className="list font-medium"><b>{list.name}</b></div> 
                                </div>
                            <div className="user-container">
                                <button className="btn btn-delete1" onClick={this.handleEdit}> <span className="glyphicon glyphicon-edit glist"></span></button>
                                <button className="btn btn-delete" onClick={this.handleDelete}> <span className="glyphicon glyphicon-trash glist"></span></button>
                                <User id={list.id}/>
                            </div>
                            </div>
                            
                        </div>
                         {panel}
                         {showedit}
                    </div>
        );
    }

    handleClick(){
        //console.log('handleClick');
        var css = (this.state.showpanel === false) ? true : false;
        this.setState({showpanel:css});
    }

    handleModal(){
        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css});
    }

    handleDelete() {
       // console.log(this.props, 'handleDelete');
         const {dispatch} = this.props;
        dispatch(deleteLists(this.props.list.id));
    }
    handleEdit() {
        console.log(this.props, 'handleEdit');
        var css = (this.state.showModalEdit === false) ? true : false;
        this.setState({showModalEdit:css});
    }

    handleiconclick1(event) {
        event.preventDefault();
        console.log(this.state.checked1, 'handleiconclick1');
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

     _submitEdit(event) {
        event.preventDefault();
        var ref;
        var listusers = [];
        console.log(this.state, 'icons');
        if(this.state.checked1) ref=this.refs.icon1.value;
        else if(this.state.checked2) ref=this.refs.icon2.value;
        else if(this.state.checked3) ref=this.refs.icon3.value;
        else if(this.state.checked4) ref=this.refs.icon4.value;
        else if(this.state.checked5) ref=this.refs.icon5.value;
        else if(this.state.checked6) ref=this.refs.icon6.value;
        console.log(this.refs.name.value, ref);

        var user ="1,2";
        var FormData = require('form-data');
        //const form = new FormData();
        //form.append('name', this.refs.name.value);
        //form.append('icon', ref);
        //form.append('users', user);



        const form = document.querySelector('#form');
        const data = new FormData(form);

        let obj = {};
        for (var pair of data.entries()) {
            obj[pair[0]] = pair[1];
        }

        console.log(obj, 'edição');


        const {dispatch} = this.props;
        dispatch(editLists(this.props.list.id, obj));
    }

    _submit(event) {
        event.preventDefault();
        var add = {
            name: this.refs.name.value, 
            quant: this.refs.quant.value,
            desc: this.refs.description.value
        };
        
            var l = this.props.item.produtos;
    
            l.push(add);
            this.setState({lc: l, showModal: false});
    }
}

Item.propTypes = {
    list: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    console.info('container LIST mapStateToProps', state, ownProps);
    return state.lists;
}


export default connect(mapStateToProps)(Item);
