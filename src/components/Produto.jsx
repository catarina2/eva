import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

class Produto extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {unline: false, showModal:false};
    }

    render() {
        var item = this.props.item;
        var panel, cheched, line = null;
        if(this.state.unline === true)
        {
            line = <hr className="line" />;
            panel =<h4 className="blackletter"><s>{item.name}</s></h4>;
            cheched =<input type="checkbox" className="check" onClick={this.handleClick} checked/>;
        }
        else
        {
            panel =<h4 className="blackletter" onClick={this.handleModal}>{item.name}</h4>;
            cheched =  <input type="checkbox" className="check" onClick={this.handleClick}/>;
        }
        return (
            <div className="row">
                {line}
                {panel} 
                {cheched}
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