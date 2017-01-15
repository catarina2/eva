import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Personas from './Personas';
import { each } from 'lodash';

class User extends Component {
    render() {
        var { users } = this.props;
        console.log(users, 'users');
        let lis = [];   
        each(users, (user, key) => {
            lis.push(
                    <li key={key} className="list-margin">
                        <Personas user={user} key={key}/>
                    </li>
            );
        });

        return (            
             <ul className="list-group-horizontal">
                {lis}
            </ul>                
        );
    }


}

User.propTypes = {
    id: React.PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
    //console.info('container App mapStateToProps', state, ownProps);
    return {users: state.userslist.userslist[ownProps.id]};
}


export default connect(mapStateToProps)(User);
