import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produto from './Produto';
import { each } from 'lodash';

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.handleModal = this.handleModal.bind(this);
        this.state = {
            showModal: false
        }
    }
    render() {
        var { produtos } = this.props;
        console.log(produtos.length);
        var panel;       
        if(produtos.length === 0)
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
        return (<div>{panel}</div>);
    }

    handleModal(){
        var css = (this.state.showModal === false) ? true : false;
        this.setState({showModal:css});
    }


}

Produtos.propTypes = {
    id: React.PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
    //console.log('container App mapStateToProps', state, ownProps);
    return {produtos: state.productslist.productslist[ownProps.id]};
}


export default connect(mapStateToProps)(Produtos);