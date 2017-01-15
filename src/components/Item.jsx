import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produtos from './Produtos';
import User from './User';

import {fetchListUsers} from '../actions';
import {fetchListProducts, deleteLists} from '../actions';

class Item extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this._submit = this._submit.bind(this);
        this.state = {
            showpanel: false,
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
                                <button className="btn btn-delete1" onClick={this.handleEdit}> <span className="glyphicon glyphicon-edit glist"></span></button>
                                <button className="btn btn-delete" onClick={this.handleDelete}> <span className="glyphicon glyphicon-trash glist"></span></button>
                                <User id={list.id}/>
                            </div>
                            
                        </div>
                         {panel}
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
       // console.log(this.props, 'handleDelete');
        var css = (this.state.showModalEdit === false) ? true : false;
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
