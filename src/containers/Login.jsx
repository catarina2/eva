import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Login extends Component {

    render() {
        
        return(
            <div>
                
                <section className="sectionLogin">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
                            <Link to={`/list`}>
                                <button className="btn btn-shoplist"></button>
                            </Link>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
                                <Link to={`/mirror`}>
                                    <button className="btn btn-mirror"></button>
                                </Link>
                                <Link to={`/definition`}>
                                    <button className="btn btn-definition"></button>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
                                <Link to={`/agend`}>
                                   <button className="btn btn-agend"></button>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
                                <Link to={`/`}>
                                   <button className="btn btn-more"></button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
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
