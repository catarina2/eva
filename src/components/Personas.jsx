import React from 'react';
import {Component} from 'react';

class Personas extends Component {
    constructor(props) {
        super(props)
        this.state = {unline: false};
    }

    render() {
        var user = this.props.user.color.split("_");
        console.log(user, 'sersdfsdg');
        var color ="losangelist"+" "+user[1];
        var avatar = "btn-smallavatarlist"+ user[0];
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