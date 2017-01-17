import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produto from './Produto';
import { each } from 'lodash';
import {Link} from 'react-router';

import {postProducts, receiveByQuerystring} from '../actions';

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.handleModal = this.handleModal.bind(this);
        this._submit = this._submit.bind(this);
        this._onChange = this._onChange.bind(this);
        this.state = {
            showModal: false,
            produtos: this.props.produtos, 
            image: null,
            imagesend:null, 
            msg: null, 
            name: null,
            quant: null
        }
       //console.log(this.state.produtos, 'constructor');

    }
     componentDidMount() {
          //console.log(this.props.item, 'componentDidMount');
        const {dispatch} = this.props;
    }
    render() {
        var produtos;
        if(this.props.msgd === 'OK')
        {
           // console.log(this.props, 'podutos quando eliminamos');
            produtos  = this.props.produtos.productslist[this.props.id].data;
        }
        else {
           // console.log(this.props, 'podutos normal');
            produtos  = this.props.produtos.productslist[this.props.id].data;
        }
        
        var panel;
        var showmodal;
       // console.log(this.state, 'produtos');
        
        if(this.state.msg === 'OK') {
            //console.log('mensagem apagada com sucesso');
            this.state.showModal = false;
            this.state.msg = null;
            this.state.image = null;
            this.state.name = null;
            this.state.quant = null;
          // setTimeout(() => {this.setState({showModal: false, msg: null, image, null})}, 1000);
            
        }
        if(this.state.msg === 'NOK')
       {
        // console.log(this.props);
          if(this.props.data.length === 1) {
               if(this.props.data[0].indexOf("quant") === -1){
                this.state.name = this.props.data[0];
                this.state.quant = null;
               }
               else {
                this.state.name = null;
                this.state.quant = this.props.data[0];
               }
              
          }
          if(this.props.data.length === 2) {
            this.state.name = this.props.data[0];
            this.state.quant = this.props.data[1];
          }
      }

        if(this.state.showModal === true)
        {
           // console.log('modalmodal1')
            var img;
            if(this.state.imagesend)
            {img =(<div className="imagediv"><img className= "image" src={this.state.image} /></div>);}
            else{
             img=(<label className="btn btn-photo" For="upload-file-selector">
                        <input ref="image" id="upload-file-selector" type="file" onChange={this._onChange}/>
                    </label>);}
             
            showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleModal}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title "><b>Novo Produto</b></h4>

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
                                            <input type="text" className="form-control" ref="title" name="name" />
                                            {this.state.name}
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
                                            <input type="text" className="form-control" ref="quant" name="name" />
                                            {this.state.quant}
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
        //console.log(produtos, 'produtos da lista');
        if(produtos === "List doesn't have products")
        {
            panel = (<div className="panel-body">
                        <h4>Adicione o primeiro produto à lista</h4>
                    <div className="col-xs-12">
                        <button className="btn btn-produto" onClick={this.handleModal}></button>
                    </div>
                    </div>);
        }
        else
        {
            // console.log(produtos, 'produtos listas');
            let lis = [];   
            each(produtos, (item, key) => {
                lis.push(
                        <div>
                            <div className="row">
                                <div key={key} className="col-xs-12">
                                    <div className="list-group-item">
                                                <Produto item={item} key={key}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                );
            });
            panel = (<div className="panel-body">
                   {lis}
                <div className="row">
                    <div className="col-xs-12">
                        <button className="btn btn-produto" onClick={this.handleModal}></button>
                    </div>
                </div>
            </div>);
            }   
        return (<div>{panel}{showmodal}</div>);
    }

    handleModal(){
       // console.log('modalmodal');
        var css = (this.state.showModal === false) ? true : false;
       // console.log(css);
        this.setState({showModal:css, image:null, imagesend: null});
    }

    _submit(event) {
        event.preventDefault();

        var input = document.querySelector('input[type="file"]');
       // console.log(this.state.imagesend, 'input file');
        var FormData = require('form-data');
        var form = new FormData();
        form.append('title', this.refs.title.value);
        form.append('quant', this.refs.quant.value);
        form.append('description', this.refs.description.value);
        form.append('list_id', this.props.id);
        if(this.state.imagesend) form.append('image', this.state.imagesend);
        this.setState({msg: this.props.msg});
        const {dispatch} = this.props;
        dispatch(postProducts(this.props.id, form));

        setTimeout(() => {this.setState({msg: this.props.msg})}, 500);
    }
     _onChange(){
       // console.log('change photo');
          var input = document.querySelector('input[type="file"]');
          var images = input.files[0];

          var reader = new FileReader();
          var url = reader.readAsDataURL(images);
         // console.log(reader);
          reader.onloadend = function (e) {
          //  console.log('estou aqui');
              this.setState({
                  image: [reader.result],
                  imagesend: images
              })
            }.bind(this);

         //  console.log(reader);
     }
}

Produtos.propTypes = {
    id: React.PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  // console.log('container Produtos mapStateToProps', state, ownProps);
   // console.log(state);
   // console.log(state, 'mensagem de sucesso ou não');
    return {produtos: state.productslist, msg: state.productslist.msgadd,msgd: state.productslist.msgdelete, data: state.productslist.dataadd};
}


export default connect(mapStateToProps)(Produtos);