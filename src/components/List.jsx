import React from 'react';
import Item from './Item';
import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';

const List = ({items}) => {
        return (
            <ul className="list-group">
                {items.map((item, key) => {
                    return (
                        <div>
                            <div className="row">
                                <li key={key} className="list-group-item">
                                            <Item item={item}/>
                                </li>
                            </div>
                            <div className="row whitelist">
                                <div className="col-xs-12">
    
                                </div>
                            </div>
                        </div>
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
