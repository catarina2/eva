import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class PerfilComponent extends Component {

    render() {
        var item = this.props.item;
       // console.log(item.icon, 'item perfil');
        var show;
        if (item.icon ==='perfil') {
            show = (<div><Link to={`definition/profile`}><input type='button' className='btn btn-perfil'/><h4 className='perfiltext'>{item.name}</h4></Link></div>);
        } else if (item.icon ==='seg')
        {
            show = (<div><input type='button' className='btn btn-seg'/><h4 className='perfiltext'>{item.name}</h4></div>);
        } else if (item.icon ==='notif')
        {
            show = (<div><input type='button' className='btn btn-notif'/><h4 className='perfiltext'>{item.name}</h4></div>);
        } else if (item.icon ==='account')
        {
            show = (<div><input type='button' className='btn btn-account'/><h4 className='perfiltext'>{item.name}</h4></div>);
        }
        else if(item.icon ==='sounds')
        {
            show = (<div><input type='button' className='btn btn-sounds'/><h4 className='perfiltext'>{item.name}</h4></div>);
        }
        else if(item.icon ==='widgets')
        {
            show = (<div><input type='button' className='btn btn-widgets'/><h4 className='perfiltext'>{item.name}</h4></div>);
        }
        else if(item.icon ==='lang')
        {
            show = (<div><input type='button' className='btn btn-lang'/><h4 className='perfiltext'>{item.name}</h4></div>);
        }
        else if(item.icon ==='access')
        {
            show = (<div><input type='button' className='btn btn-access'/><h4 className='perfiltext'>{item.name}</h4></div>);
        }
        else if(item.icon ==='version')
        {
            show = (<div><input type='button' className='btn btn-version'/><h4 className='perfiltext'>{item.name}</h4></div>);
        }
        
        return (
            <div>
                <hr/>
                {show}
            </div>
        );
    }


}

PerfilComponent.propTypes = {
    item: React.PropTypes.object.isRequired
}

export default PerfilComponent;
