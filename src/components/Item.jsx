import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Produto from './Produto';

class Item extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            showpanel: false
        }
    }

    render() {
        var item = this.props.item;
        var panel = null;
        if(this.state.showpanel === true)
        {
            if(item.produtos)
            {
                    panel = (<div className="panel-body">
                            {item.produtos.map((item, key) => {
                            return (
                                <div>
                                    <div className="row">
                                        <li key={key} className="list-group-item">
                                                    <Produto item={item}/>
                                        </li>
                                    </div>
                                    <div className="row whitelist">
                                        <div className="col-xs-12">
            
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>);
                }
                else
                {
                    panel = <div className="panel-body">
                                <h3>Não existe produtos nesta lista</h3>
                            </div>;
                }
        }
        return (
            <div className="container">
                <div className="listitem">
                        <div className="panel panel-primary" >
                            <div className="row panelrow">
                                <div className="col-xs-10 aligncenter ">
                                <div className="panel-heading" onClick={this.handleClick}>
                                    <h3 className="list">{item.name}</h3>
                                </div>
                                </div>
                                <div className="col-xs-2">
                                    <button type="button" className="btn btn-user" aria-label="Left Align">
                                        <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                 {panel}
                            </div>
                        </div>
                    </div>

                </div>
        );
    }

    handleClick(){
        console.log(this.props, 'handleclick');
        var css = (this.state.showpanel === false) ? true : false;
        this.setState({showpanel:css});
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
