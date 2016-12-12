import React from 'react';
import {Link} from 'react-router';

const ItemDetail = ({item}) => {
    // console.info('component ItemDetail', item);

    const htmlNotFound = <p>Not found...</p>; 
    const htmlButtonBack = <Link to="/">Voltar à lista</Link>;

    if (!item) {
        return <div>{htmlNotFound}{htmlButtonBack}</div>;
    } else {
        return (
            <div>
                {htmlButtonBack}
                <div className="contact-item">
                    <img src={`http://catblog.myddns.me/img/${item.photo}`} alt={item.id} />
                    <ul>
                        <li>{item.name}</li>
                        <li>{item.mail}</li>
                        <li>{item.phone}</li>
                        <li>{item.address}</li>
                    </ul>
                </div>
            </div>
        );
    }
};

ItemDetail.propTypes = {
    item: React.PropTypes.object
};

export default ItemDetail;
