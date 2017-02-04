import React from 'react';
import {Component} from 'react';

class Personas extends Component {
    constructor(props) {
        super(props)
        this.state = {unline: false};
    }

    render() {
        var color ="losangelist"+" "+this.props.user.color;
        var avatar = "btn-smallavatarlist"+ this.props.user.avatar;
        var persona;
        
            persona = <div className='displayavatares'>
                            <div className="cc-selectorlist">
                            <div className={color}>
                               <div className="loslist"> <button ref="photo" className={avatar}></button></div>
                            </div>
                            </div>
                      </div>;
        return (
            <div className="displayavatares">
                {persona}
            </div>
        );
    }


}

Personas.propTypes = {
    user: React.PropTypes.object.isRequired
}
export default Personas;