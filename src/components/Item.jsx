import React from 'react';
import {Link} from 'react-router';

const Item = ({item}) => {
    // console.info('component Item', item);
    return (
        <div className="contact-item">
            <Link to={`/c/${item.id}`}>
                <img src={`http://catblog.myddns.me/img/${item.photo}`} alt={item.id} />
                <ul>
	                <li>{item.name}</li>
                    <li>{item.mail}</li>
	                <li>{item.phone}</li>
	                <li>{item.address}</li>
                </ul>
            </Link>
            <Link to={`/edit/${item.id}`}>Editar</Link>
        </div>
    );
};

Item.propTypes = {
    item: React.PropTypes.object.isRequired
};

export default Item;
