import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {unline: false};
    }

    render() {
        console.log("PROPS EVENT ",this.props.ev);
            var ev = this.props.ev;
            var persona = [];
            ev.users.map((i, key) => {

                console.log('USER COLOR', i.color);
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
                console.log('PERSONA', persona);
            });
            
               
        return (
            <div>
               {ev.start_time}-{ev.end_time} {persona} {ev.title} - {ev.location}
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