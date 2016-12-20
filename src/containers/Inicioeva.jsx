import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Inicioeva extends Component {

    render() {
        
        return(
            <div>
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-2"><h1>logo</h1></div>
                            <div className="col-xs-10 wrapper">
                                <h4>Environmental Virtual Assistant</h4>
                            </div>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="container">
                        <div className="row">
                            <Link to={`/list`}>
                                <p>botão lista compras</p>
                            </Link>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <Link to={`/mirror`}>
                                    <p>botão espelho</p>
                                </Link>
                            </div>
                            <div className="col-xs-6">
                                <Link to={`/definition`}>
                                    <p>botão definições</p>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <Link to={`/agend`}>
                                <p>botão agenda familiar</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
        
    }
}

Inicioeva.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.contacts;
}

export default connect(mapStateToProps)(Inicioeva);
