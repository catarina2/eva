import React from 'react';
import {Component} from 'react';

class Personas extends Component {
    constructor(props) {
        super(props)
        this.state = {unline: false};
    }

    render() {
        var user = this.props.user;
        console.log(user, 'sersdfsdg');
        var persona;
        if(user.color === "red")
        {
            persona=<input type="button" className='btn btn-personared'/>;
        }
        if(user.color === "blue")
        {
            persona=<input type="button" className='btn btn-personablue'/>
        }
        if(user.color === "green")
        {
            persona=<input type="button" className='btn btn-personagreen'/>
        }
        if(user.color === "pink")
        {
            persona=<input type="button" className='btn btn-personapink'/>
        }
        if(user.color === "bluedark")
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
    user: React.PropTypes.object.isRequired
}
export default Personas;