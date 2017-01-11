import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produtos from './Produtos';
import User from './User';
import {Link} from 'react-router';

import {fetchListUsers} from '../actions';
import {fetchListProducts} from '../actions';

class Item extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this._submit = this._submit.bind(this);
        this.state = {
            showpanel: false,
            showModal: false,
            produtos: null,
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
        var showmodal;
        if(this.state.showModal === true)
        {
            showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleModal}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Novo Produto</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submit}>
                                    <div className="row">
                                    <div className="col-xs-6">
                                    <div className="row">
                                        <div className="col-xs-2">
                                            <button type="button" className="btn btn-edit"></button>
                                        </div>
                                        <div className="col-xs-8">
                                             <h4 >Nome</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="name" name="name" />
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <input type="button" ref="photo" className="btn btn-photo"></input>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Quantidade</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="quant" name="name" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Descrição</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="description" name="name" />
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

        if(this.state.showpanel === true)
        {
            panel = <Produtos id={list.id} />;
        }
        var icon;
        if(list.icon === "casa"){
                    icon= <button className="btn casa"></button>;
        }
        else if (list.icon === "trabalho")
        {
                    icon= <button className="btn trabalho"></button>;
        }
        else if (list.icon === "natal")
        {
                    icon= <button className="btn natal"></button>;
        }
        else if (list.icon === "prenda")
        {
                    icon= <button className="btn prenda"></button>;
        }
        else if (list.icon === "ovo")
        {
                    icon= <button className="btn ovo"></button>;
        }
        else if (list.icon === "ferias")
        {
                    icon= <button className="btn ferias"></button>;
        }
        else if (list.icon === "roupa")
        {
                    icon= <button className="btn roupa"></button>;
        }

        return (
                    <div className="panel panel-primary" >
                        <div className="panelrow">
                            <div className="panel-heading ">
                                <div onClick={this.handleClick}>
                                    <h3 className="list"><b>{list.name}</b></h3>
                                    {icon}
                                </div>
                                <input type="button" className='btn btn-personas'/>
                                <User id={list.id}/>
                            </div>
                            
                        </div>
                         {panel}
                         {showmodal}
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
    // console.info('container App mapStateToProps', state, ownProps);
    return state.lists;
}


export default connect(mapStateToProps)(Item);
