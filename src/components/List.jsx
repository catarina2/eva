import React from 'react';
import Item from './Item';

const List = ({items}) => {
    // console.info('component List', items);
    return (
        <ul className="gif-list">
            {items.map((item, key) => {
                return (
                    <li key={key} className="">
                        <Item item={item} />
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
