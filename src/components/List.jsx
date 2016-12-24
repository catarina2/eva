import React from 'react';
import Item from './Item';
import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';

const List = ({items}) => {
        return (
            <ul className="list-group">
                {items.map((item, key) => {
                    return (
                        <li key={key}>
                                <Item item={item} key= {key}/>
                        </li>
                    
                    );
                })}
            </ul>
        );

};

List.propTypes = {
    items: React.PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.contacts;
}

export default List;
