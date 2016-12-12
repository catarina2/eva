import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ListComponent from '../components/List';

class List extends Component {
    render() {
        // console.info('container List', this.props);
        const {isFetching, items} = this.props;
        const htmlContent = isFetching ? <p>Loading...</p> : <ListComponent items={items} />;

        return (
        	<div>
        		<a href="/add">Adicionar contacto</a>
        		{htmlContent}
        	</div>
    	);
    }
}

List.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container List mapStateToProps', state, ownProps);
    return state.contacts;
}

export default connect(mapStateToProps)(List);
