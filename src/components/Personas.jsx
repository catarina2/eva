import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

class Personas extends Component {
    constructor(props) {
        super(props)
        this.state = {unline: false};
    }

    render() {
        var item = this.props.item;
        var persona;
        if(item.color === "red")
        {
            persona=<input type="button" className='btn btn-personared'/>;
        }
        if(item.color === "blue")
        {
            persona=<input type="button" className='btn btn-personablue'/>
        }
        if(item.color === "green")
        {
            persona=<input type="button" className='btn btn-personagreen'/>
        }
        if(item.color === "pink")
        {
            persona=<input type="button" className='btn btn-personapink'/>
        }
        if(item.color === "bluedark")
        {
            persona=<input type="button" className='btn btn-personabluedark'/>
        }
        return (
            <div>
                {persona}
            </div>
        );
    }


}

Personas.propTypes = {
    item: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.contacts;
}


export default connect(mapStateToProps)(Personas);