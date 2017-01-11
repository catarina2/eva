import React from 'react';
import Item from './Item';

const List = ({lists}) => {
   // console.log(items, 'items list');
        return (
            <ul className="list-group">
                {lists.map((list, key) => {
                    //console.log(item, 'item lalalalalall');
                    return (
                        <li key={key}>
                                <Item list={list} key={key}/>
                        </li>
                    
                    );
                })}
            </ul>
        );

};

List.propTypes = {
    lists: React.PropTypes.array.isRequired
};

export default List;
