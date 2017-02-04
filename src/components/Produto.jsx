import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {deleteProducts, updateProducts} from '../actions';

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
        this._onChange = this._onChange.bind(this);
        this._submit = this._submit.bind(this);
        
        this.state = {unline: false, image: null,showModal:false, showEdit:false, msge:null, confirmdelete:false, msg:null, imagesend: null};
    }

     componentDidMount() {
          //console.log(this.props.item, 'componentDidMount');
        const {dispatch} = this.props;
    }

    render() {
        console.log(this.props.item, this.state.imagesend, this.state, 'produto id');
        var item = this.props.item;
        var panel, cheched, line = null;
        if(item.image) this.state.imagesend= item.image;
        console.log(this.state.imagesend, 'imagem do produto');
       //console.log(this.props.msg, 'mensagem apagada com sucesso');
        if(this.state.msg === 'OK') {

           setTimeout(() => {this.setState({showModal: false, confirmdelete: false, msg: null})}, 500);
            
        }
        else if(this.state.msge === 'OK')
        {
            setTimeout(() => {this.setState({showEdit: false, confirmdelete: false, msge: null})}, 500);
        }
        if(this.state.unline === true)
        {
            line = <hr className="line" />;
            panel =<h4 className="blackletter" onClick={this.handleClickProdut}>{item.title}</h4>;
            cheched =<input type="checkbox" className="check" onClick={this.handleClick} checked/>;
        }
        else
        {
            panel =<div onClick={this.handleClickProdut}><h4 className="blackletter" >{item.title}</h4><div className="product"><b>Quantidade:</b>{item.quant}</div></div>;
            cheched =  <input type="checkbox" className="check" onClick={this.handleClick}/>;
        }
        if(this.state.showModal)
        {
           // console.log('lallalalalalal');
                var showmodal;
                var image;
                if(item.image) {
                    image =(<div className="losange">
                             <div className="los1">        
                                    <img width="100" height="100" src= {`http://develop.mmota.online/images/${item.image}`} />
                            </div></div>);
                }
                else{
                    image =null;
                }
                showmodal =(
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
                 var img;
                 console.log(this.state.imagesend, 'imagem enviada')
                    if(this.state.imagesend)
                    {img =(<div className="losange">
                             <div className="los1">        
                                    <img width="100" height="100" src= {`http://develop.mmota.online/images/${this.state.imagesend}`} />
                            </div></div>);}
                    else{
                     img=(<label className="btn btn-photo" For="upload-file-selector">
                                <input ref="image" id="upload-file-selector" type="file" onChange={this._onChange}/>
                            </label>);}
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
                                       {img}
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
       //console.log(this.refs.title.value, this.refs.quant.value, this.refs.description.value );

        var FormData = require('form-data');
        var form = new FormData();
        form.append('title', this.refs.title.value);
        form.append('quant', this.refs.quant.value);
        form.append('description', this.refs.description.value);
        form.append('list_id', this.props.item.list_id);
        form.append('created_by', 2);
        if(this.state.imagesend) form.append('image', this.state.imagesend);
        
       // console.log(obj, this.props);
        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");
        var show = (this.state.showEdit === false) ? true : false;
        const {dispatch} = this.props;
        dispatch(updateProducts(this.props.item.id, form));
        setTimeout(() => { bodyScroll.className = ""; header.className = "header header-list"; this.setState({msge: this.props.msge});this.setState({showEdit: show});}, 520);
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

        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");

        const {dispatch} = this.props;
        dispatch(deleteProducts(this.props.item.id, this.props.item.list_id));
        setTimeout(() => { bodyScroll.className = ""; header.className = "header header-list";this.setState({msg: this.props.msg})}, 500);
    }
    noconfirm() {
        this.setState({confirmdelete: false});
    }
    

    handleEdit(){
       // console.log( 'handleEdit');
        this.setState({showModal: false, showEdit: true});
    }

    handleClickProdut() {

        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");

        if(this.state.showModal === false){
            header.classList.add("header-hide");
            bodyScroll.classList.add("body-stop-scroll");
        }else{
            header.className = "header header-list";
            bodyScroll.className = "";

        }
        var show = (this.state.showModal === false) ? true : false;
        //console.log(show)
        this.setState({showModal: show});
    }
    handleClickEdit() {

        var header = document.getElementById("header");
        var bodyScroll = document.getElementById("body");

        if(this.state.showEdit === false){
            header.classList.add("header-hide");
            bodyScroll.classList.add("body-stop-scroll");
        }else{
            header.className = "header header-list";
            bodyScroll.className = "";

        }
        var show = (this.state.showEdit === false) ? true : false;
        this.setState({showEdit: show});
    }

     _onChange(){
       // console.log('change photo');
          var input = document.querySelector('input[type="file"]');
          var images = input.files[0];
          console.log(input, images, 'onchange')

          var reader = new FileReader();
          var url = reader.readAsDataURL(images);
          console.log(reader);
          reader.onloadend = function (e) {
          //  console.log('estou aqui');
              this.setState({
                  image: [reader.result],
                  imagesend: images.name
              })
            }.bind(this);
     }
}

Produto.propTypes = {
    item: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
   console.log('container produto mapStateToProps', state, ownProps.item.id);
 //  console.log(state.productslist.productslist[ownProps.item.id]);
 // console.log('produto', state);
    return {msg: state.productslist.msgdelete, msge: state.productslist.msgedit};
}

export default connect(mapStateToProps)(Produto);