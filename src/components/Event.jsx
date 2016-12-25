import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {unline: false};
    }

    render() {
            var ev = this.props.ev;
            var persona = [];
            ev.users.map((i, key) => {
                 if(i.color === "red")
                {
                    console.log(1);
                    persona.push(<input type="button" className='btn btn-personaredsmall'/>);
                }
                if(i.color === "blue")
                {
                    console.log(2);
                    persona.push(<input type="button" className='btn btn-personabluesmall'/>);
                }
                if(i.color === "green")
                {
                    console.log(3);
                    persona.push(<input type="button" className='btn btn-personagreensmall'/>);
                }
                if(i.color === "pink")
                {
                    console.log(4);
                    persona.push(<input type="button" className='btn btn-personapinksmall'/>);
                }
                if(i.color === "bluedark")
                {
                    console.log(5);
                    persona.push(<input type="button" className='btn btn-personabluedarksmall'/>);
                }
            });
            console.log(persona);
            
               
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
    return state.contacts;
}


export default connect(mapStateToProps)(Event);