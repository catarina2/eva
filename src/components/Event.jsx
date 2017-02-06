import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

import { each } from 'lodash';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {unline: false};
    }

    render() {
        //console.log("PROPS EVENT ",this.props.ev);
            var ev = this.props.ev;
            var persona = [];
            var time="";
            ev.users.map((i, key) => {

                var classNameLosangle ={};
                var className = {};
                var avatar = "btn-smallEventavatar"+i.avatar+" "+i.color;
                if(ev.start_time==ev.end_time && ev.start_time=="00:00"){
                    time="Todo o dia"
                }else{
                    time= ev.start_time+"-"+ev.end_time;
                }
                classNameLosangle[i]="losangeUserEvent"+" "+i.color;

                className[i]="btn btn-persona"+i.color+"small";
                //console.info("ICON CLASSNAME: ", className[i])
                persona.push(<div className={classNameLosangle[i]}> <div className="Userevent"> <button ref="photo" className={avatar}></button></div></div>);

            });
            
               
        return (
            <div>
               {time} {persona} {ev.title} - {ev.location}
            </div>
        );
    }


}

Event.propTypes = {
    ev: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.lists;
}


export default connect(mapStateToProps)(Event);