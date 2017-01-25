import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Callback extends Component {

    render() {
        
        var code = document.location.search.substring(6);

    // criar a chamada AJAX para obter o token, atenção aos parâmetros, novamente têm ce ser iguais aos criados no laravel
    var http = new XMLHttpRequest();
    var url = "http://develop.mmota.online/oauth/token";
    var params = "grant_type=authorization_code";
        params += '&client_id=6';
        params += '&client_secret=BqUt2kB3fylwsCwkKNSj3mplY2PMHneGEs5lD1so';
        params += '&redirect_uri=http://localhost:3000//callback';
        params += '&code='+code;

    http.open("POST", url, true);

    // Definir os headers
    http.setRequestHeader('Accept', 'application/json, application/x-www-form-urlencoded');
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // função que irá obter a resposta do servidor
    var user;
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            
            console.log(http.responseText)

            // obtem o objeto retornado e transforma-o num JSON válido.
            var response = JSON.parse(http.responseText);

            if(response.token_type == "Bearer")
            {
                
                // este é o token que devemos guardar para enviar em todas as chamas daqui para a frente 
                var token = "Bearer "+response.access_token;

                // exemplo de uma chamada para obter o utilizador autenticado
                var http2 = new XMLHttpRequest();
                var url = "http://develop.mmota.online/api/user";

                    http2.open("GET", url, true);

                    // novamente definir os headers, desta vez notar o header "Authorization" onde passamos o token
                    http2.setRequestHeader('Accept', 'application/json, application/x-www-form-urlencoded');
                    http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    http2.setRequestHeader("Authorization", token);


                    http2.onreadystatechange = function() {
                        if(http2.readyState == 4 && http2.status == 200) {

                            // ver na consola a informação do utilizador autenticado!
                            console.log(http2.responseText);
                        }
                    }
                    
                    http2.send();
            }
            
        }
    }
    http.send(params);
    
     return(<div>
                <header className="header-initial">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 list-group-horizontal-eva">
                                <h1 className="logoeva">eva         </h1>
                                <h5 className="eva"><b>   Environmental Virtual Assistant</b></h5>
                            </div>
                            <button className="btn setainicial"></button>
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
            </div>);
        
    }


}

Callback.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.lists;
}

export default connect(mapStateToProps)(Callback);