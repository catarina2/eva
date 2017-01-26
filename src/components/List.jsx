import React from 'react';
import Item from './Item';

const List = ({lists}) => {
   // console.log(items, 'items list');
        return (
            <ul className="list-group">
                {lists.map((list, key) => {
                    //console.log(item, 'item lalalalalall');
                   // console.log(key, 'key da lista')
                    return (
                        <li key={key}>

                                <Item list={list} listkey={key}/>
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
