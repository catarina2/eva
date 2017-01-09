import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

class PerfilComponent extends Component {

    render() {
        var item = this.props.item;
        console.log(item.icon, 'item perfil');
        var show;
        if(item.icon ==='perfil')
        {
            show = (<input type='button' className='btn btn-perfil'/>);
        }
        else if(item.icon ==='seg')
        {
            show = (<input type='button' className='btn btn-seg'/>);
        }
        else if(item.icon ==='notif')
        {
            show = (<input type='button' className='btn btn-notif'/>);
        }
        else if(item.icon ==='account')
        {
            show = (<input type='button' className='btn btn-account'/>);
        }
        else if(item.icon ==='sounds')
        {
            show = (<input type='button' className='btn btn-sounds'/>);
        }
        else if(item.icon ==='widgets')
        {
            show = (<input type='button' className='btn btn-widgets'/>);
        }
        else if(item.icon ==='lang')
        {
            show = (<input type='button' className='btn btn-lang'/>);
        }
        else if(item.icon ==='access')
        {
            show = (<input type='button' className='btn btn-access'/>);
        }
        else if(item.icon ==='version')
        {
            show = (<input type='button' className='btn btn-version'/>);
        }

        return (
            <div>
                <hr/>
                {show}
                    <h4 className='perfiltext'>{item.name}</h4>
            </div>
        );
    }


}

PerfilComponent.propTypes = {
    item: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.contacts;
}


export default connect(mapStateToProps)(PerfilComponent);
