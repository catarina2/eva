import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Inicioeva extends Component {

    render() {
        
        return(
            <div>
                <header className="header header-initial">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 list-group-horizontal-eva">
                                <h1 className="logoeva">eva         </h1>
                                <h5 className="eva menu-title font-large"><b>   Environmental Virtual Assistant</b></h5>
                            </div>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="container">
                        <div className="row">
                        <div className="col-xs-12">
                            <Link to={`lists`}>
                                <button className="btn btn-shoplist"></button>
                            </Link>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <Link to={`mirror`}>
                                    <button className="btn btn-mirror"></button>
                                </Link>
                                <Link to={`definition`}>
                                    <button className="btn btn-definition"></button>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <Link to={`calendar`}>
                                   <button className="btn btn-agend"></button>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
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

Inicioeva.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.lists;
}

export default connect(mapStateToProps)(Inicioeva);
