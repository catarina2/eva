import {connect} from 'react-redux';
import _ from 'lodash';

import ItemDetailComponent from '../components/ItemDetail';

const mapStateToProps = (state, ownProps) => {
    // console.info('container ItemDetail mapStateToProps', state, ownProps);
    return {item: _.find(state.contacts.items, (item) => { return item.id === parseInt(ownProps.params.id, 10); })}
};

export default connect(mapStateToProps)(ItemDetailComponent)
