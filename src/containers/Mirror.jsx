import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Mirror extends Component {

    render() {
        
        return(
           <div>
                 <Link to={`/`}><header className="headerfirst ">
                   <div className="container">
                       <div className="title">eva</div>
                    </div>
                </header></Link>
                <header id="header" className="header header-mirror">
                    <div className="container">
                    <div className="menu-title font-large">Espelho</div>
                    </div>
                </header>
                <section>
                        <h4> Página em Desenvolvimento</h4>
                </section>        
                <footer className="footerfixedmirror navbar fixed-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-10">
                                <div className="titlefooter">Environmental Virtual Assistant</div>
                            </div>
                            
                        </div>
                    </div>
                </footer>
            </div>
        );
        
    }
}

export default Mirror;
