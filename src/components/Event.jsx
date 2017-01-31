import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {unline: false};
    }

    render() {

        console.log("VER events em STATE: ", this.state);
        console.log("VER events em PROPS: ", this.props);
            var ev = this.props.ev;
            var persona = [];
            console.log(ev, 'evento');
            ev.users.map((i, key) => {
                 if(i.color === "red")
                {
                    persona.push(<input type="button" className='btn btn-personaredsmall'/>);
                }
                if(i.color === "blue")
                {
                    persona.push(<input type="button" className='btn btn-personabluesmall'/>);
                }
                if(i.color === "green")
                {
                    persona.push(<input type="button" className='btn btn-personagreensmall'/>);
                }
                if(i.color === "pink")
                {
                    persona.push(<input type="button" className='btn btn-personapinksmall'/>);
                }
                if(i.color === "bluedark")
                {
                    persona.push(<input type="button" className='btn btn-personabluedarksmall'/>);
                }
            });
            
               
        return (
            <div>
               {ev.hour} {persona} {ev.note} - {ev.location}
            </div>
        );
    }


}

Event.propTypes = {
    item: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.lists;
}


export default connect(mapStateToProps)(Event);