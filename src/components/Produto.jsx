import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {fetchListUsers} from '../actions';
        import {fetchListProduct, deleteProducts, updateProducts} from '../actions';

class Produto extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleClickProdut = this.handleClickProdut.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.confirmdelete = this.confirmdelete.bind(this);
        this.noconfirm = this.noconfirm.bind(this);
        this._submit = this._submit.bind(this);
        
        this.state = {unline: false, showModal:false, showEdit:false, confirmdelete:false, msg:null};
    }

     componentDidMount() {
          //console.log(this.props.item, 'componentDidMount');
        const {dispatch} = this.props;
    }

    render() {
        console.log(this.props.item, 'produto id');
        var item = this.props.item;
        var panel, cheched, line = null;
        //console.log(item, 'produtos');
       //console.log(this.props.msg, 'mensagem apagada com sucesso');
        if(this.state.msg === 'OK') {
            //console.log('mensagem apagada com sucesso');
            //this.state.showModal = false;
           // this.state.confirmdelete= false;
           // this.state.msg=null;
           setTimeout(() => {this.setState({showModal: false, confirmdelete: false, msg: null})}, 1000);
            
        }
        if(this.state.unline === true)
        {
            line = <hr className="line" />;
            panel =<h4 className="blackletter" onClick={this.handleClickProdut}>{item.title}</h4>;
            cheched =<input type="checkbox" className="check" onClick={this.handleClick} checked/>;
        }
        else
        {
            panel =<h4 className="blackletter" onClick={this.handleClickProdut}>{item.title}</h4>;
            cheched =  <input type="checkbox" className="check" onClick={this.handleClick}/>;
        }
        if(this.state.showModal)
        {
           // console.log('lallalalalalal');
                var showmodal;
                var image;
                if(item.image) {
                    image =  <div className="imagediv">
                                    <img className= "image" src= {`http://develop.mmota.online/images/${item.image}`} />
                            </div>;
                }
                else{
                    image = (<input type="button" ref="photo" className="btn btn-photo"></input>);
                }
                showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleClickProdut}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title font-medium"><b>Especificações</b></h4>

                            </div>
                            <div className="modal-body">
                                    <div className="row">
                                    <div className="col-xs-6">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4 className="specification">{item.title}</h4>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-xs-6">
                                        {image}
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Quantidade</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <label >{item.quant}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Descrição</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <label>{item.description}</label>
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
                                            <div className="col-xs-2 display1">
                                                <button className="btn btn-default" onClick={this.handleEdit}> <span className="glyphicon glyphicon-edit"></span></button>
                                                <button className="btn btn-default" onClick={this.handleDelete}> <span className="glyphicon glyphicon-trash"></span></button>
                                            </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if(this.state.confirmdelete)
        {
                var showedit;
                showedit = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                             <div className="modal-header">
                               <h4 className="modal-title"><b>Produto {item.title}</b></h4>
                            </div>
                            <div className="modal-body">
                                   <h4>Deseja apagar este produto?</h4>
                                    <div className="modal-footer">
                                        <button className="btn btn-confirm" onClick={this.confirmdelete}>Sim</button>
                                        <button className="btn btn-confirm" onClick={this.noconfirm}>Não</button> 
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

         if(this.state.showEdit)
        {
                var showedit;
                showedit = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleClickEdit}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Produto {item.title}</b></h4>

                            </div>
                            <div className="modal-body">
                                <form id="form" method="POST" onSubmit={this._submit} encType="multipart/form-data">
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
                                            <input type="text" className="form-control" ref="title" name="name" defaultValue={item.title} />
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-xs-6">
                                       
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Quantidade</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="quant" name="name" defaultValue={item.quant} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Descrição</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" ref="description" name="name" defaultValue={item.description} />
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
            <div className="row">
                {line}
                {panel} 
                {cheched}
                {showmodal}
                {showedit}
            </div>

        );
    }

    _submit(event){
        event.preventDefault();
       console.log(this.refs.title.value, this.refs.quant.value, this.refs.description.value );

        var FormData = require('form-data');
        const form = new FormData();
        form.append('title', this.refs.title.value);
        form.append('quant', this.refs.quant.value);
        form.append('description', this.refs.description.value);
        const {dispatch} = this.props;
        dispatch(updateProducts(this.props.item.id, form));
    }

    handleClick(){
        var underline = (this.state.unline === false) ? true : false;
        this.setState({unline: underline});
    }

    handleDelete(){
        //console.log(this.props, 'handledelete');
        this.setState({confirmdelete: true});
    }

    confirmdelete() {
        const {dispatch} = this.props;
        dispatch(deleteProducts(this.props.item.id, this.props.item.list_id));
        setTimeout(() => {this.setState({msg: this.props.msg})}, 500);
    }
    noconfirm() {
        this.setState({confirmdelete: false});
    }
    

    handleEdit(){
       // console.log( 'handleEdit');
        this.setState({showModal: false, showEdit: true});
    }

    handleClickProdut() {
        var show = (this.state.showModal === false) ? true : false;
        //console.log(show)
        this.setState({showModal: show});
    }
    handleClickEdit() {
        var show = (this.state.showEdit === false) ? true : false;
        this.setState({showEdit: show});
    }
}

Produto.propTypes = {
    item: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  // console.log('container produto mapStateToProps', state, ownProps.item.id);
 //  console.log(state.productslist.productslist[ownProps.item.id]);
 // console.log('produto', state);
    return {msg: state.productslist.msgdelete};
}

export default connect(mapStateToProps)(Produto);