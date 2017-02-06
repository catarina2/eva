import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { each } from 'lodash';

import {postRegistar} from '../actions';

class Login extends Component {

   constructor(props) {
        super(props);
     
    }

    componentDidMount() {
       // console.log('componentdidMount');
        const {dispatch} = this.props;
    }

    render() {
        
        return(
                <div className="pageinitial">
                   <div className="container">
                       <div className="evalogin">eva</div>
                       <div className="sloganinitial">Environmental Virtual Assistant</div>
                       <div className="container logineva">
                           <hr  className="classhrinitial"/>
                            <Link to="register"><button className="btn btn-login">Registar </button></Link>
                           <hr  className="classhrinitial"/>
                           <hr  className="classhrinitial"/>
                           <a href="http://develop.mmota.online/oauth/authorize?client_id=1&redirect_uri=http://localhost:3000/callback&response_type=code&scope">
                                 <button className="btn btn-login">Login </button>
                           </a>
                           <hr  className="classhrinitial"/>
                        </div>
                    </div>
                </div>
        );
        
    }

}



Login.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
     console.info('container Login mapStateToProps', state, ownProps);
    return state.lists;
}

export default connect(mapStateToProps)(Login);
