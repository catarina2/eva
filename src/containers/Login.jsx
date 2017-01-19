import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Login extends Component {

    render() {
        
        return(
            <div>
                
                <div>
                    <a href="http://develop.mmota.online/oauth/authorize?client_id=6&redirect_uri=http://localhost:3000/callback&response_type=code&scope">
                        <button className="btn btn-default">LOGIN</button>
                    </a>
                </div>
            </div>
        );
        
    }
}

Login.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.lists;
}

export default connect(mapStateToProps)(Login);
