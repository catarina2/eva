import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produto from './Produto';
import Personas from './Personas';
import {Link} from 'react-router';

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

    render() {
        var item = this.props.item;
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
            if(item.produtos === '[]')
                {
                    console.log(item.produtos, 'lalalalallalalnull');
                    panel = <div className="panel-body">
                                Não existem produtos nesta lista 
                            <div className="col-xs-12">
                                <button className="btn btn-produto" onClick={this.handleModal}></button>
                            </div>
                            </div>;
                }
            else
            {
                console.log(item.produtos, 'lalalalallalal');
                    panel = (<div className="panel-body">
                            {item.produtos.map((item, key) => {
                            return (
                                <div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <li key={key} className="list-group-item">
                                                        <Produto item={item}/>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="row">
                            <div className="col-xs-12">
                                <button className="btn btn-produto" onClick={this.handleModal}></button>
                            </div>
                        </div>
                    </div>);
                }
        }
        var icon;
        if(item.icon === "casa"){
                    icon= <button className="btn casa"></button>;
        }
        else if (item.icon === "trabalho")
        {
                    icon= <button className="btn trabalho"></button>;
        }
        else if (item.icon === "natal")
        {
                    icon= <button className="btn natal"></button>;
        }
        else if (item.icon === "prenda")
        {
                    icon= <button className="btn prenda"></button>;
        }
        else if (item.icon === "ovo")
        {
                    icon= <button className="btn ovo"></button>;
        }
        else if (item.icon === "ferias")
        {
                    icon= <button className="btn ferias"></button>;
        }
        else if (item.icon === "roupa")
        {
                    icon= <button className="btn roupa"></button>;
        }

        return (
                                <div className="panel panel-primary" >
                                    <div className="panelrow">
                                        <div className="panel-heading ">
                                            <div onClick={this.handleClick}>
                                                <h3 className="list"><b>{item.name}</b></h3>
                                                {icon}
                                            </div>
                                            <input type="button" className='btn btn-personas'/>
                                        <ul className="list-group-horizontal">
                                                
                                                {item.users.map((item, key) => {
                                                    return (
                                                            <div className="row">
                                                                    <li key={key} className="list-margin">
                                                                            <Personas item={item}/>
                                                                    </li>
                                                            </div>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                        
                                    </div>
                                     {panel}
                                     {showmodal}
                                </div>
        );
    }

    handleClick(){
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
    item: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.contacts;
}


export default connect(mapStateToProps)(Item);
