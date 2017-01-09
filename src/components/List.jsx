import React from 'react';
import Item from './Item';

const List = ({items}) => {
    console.log(items, 'items list');
        return (
            <ul className="list-group">
                {items.map((item, key) => {
                    return (
                        <li key={key}>
                                <Item item={item} key={key}/>
                        </li>
                    
                    );
                })}
            </ul>
        );

};

List.propTypes = {
    items: React.PropTypes.array.isRequired
};

export default List;
