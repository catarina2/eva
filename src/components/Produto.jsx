import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Produto extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleClickProdut = this.handleClickProdut.bind(this);
        this.state = {unline: false, showModal:false};
    }

    render() {
        var item = this.props.item;
        var panel, cheched, line = null;
        if(this.state.unline === true)
        {
            line = <hr className="line" />;
            panel =<h4 className="blackletter" onClick={this.handleClickProdut}>{item.name}</h4>;
            cheched =<input type="checkbox" className="check" onClick={this.handleClick} checked/>;
        }
        else
        {
            panel =<h4 className="blackletter" onClick={this.handleClickProdut}>{item.name}</h4>;
            cheched =  <input type="checkbox" className="check" onClick={this.handleClick}/>;
        }
        if(this.state.showModal)
        {
                var showmodal;
                showmodal = (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn btn-default" onClick={this.handleClickProdut}> <span className="glyphicon glyphicon-remove"></span></button>
                                <h4 className="modal-title"><b>Especificações</b></h4>

                            </div>
                            <div className="modal-body">
                                    <div className="row">
                                    <div className="col-xs-6">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4 className="specification">{item.name}</h4>
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
                                            <label>{item.desc}</label>
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
                                    </div>
                                    </div>
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
            </div>

        );
    }

    handleClick(){
        var underline = (this.state.unline === false) ? true : false;
        this.setState({unline: underline});
    }

    handleClickProdut() {
        var show = (this.state.showModal === false) ? true : false;
        this.setState({showModal: show});
    }
}

Produto.propTypes = {
    item: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.contacts;
}


export default connect(mapStateToProps)(Produto);