import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

class Produto extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {unline: false};
    }

    render() {
        var item = this.props.item;
        var panel, cheched = null;
        if(this.state.unline === true)
        {
            panel =<h4 className="blackletter"><s>{item.name}</s></h4>;
            cheched =<input type="checkbox" onClick={this.handleClick} checked/>;
        }
        else
        {
            panel =<h4 className="blackletter">{item.name}</h4>;
            cheched =  <input type="checkbox" onClick={this.handleClick}/>;
        }
        return (
            <div className="row">
               <div className="col-xs-10">
                    {panel}
               </div>
               <div className="col-xs-2">
                   {cheched}
               </div>
            </div>

        );
    }

    handleClick(){
        var underline = (this.state.unline === false) ? true : false;
        this.setState({unline: underline});
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