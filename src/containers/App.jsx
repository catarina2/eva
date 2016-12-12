import {Component} from 'react';
import {connect} from 'react-redux';

import {fetchContacts} from '../actions';

class App extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchContacts());
    }

    render() {
        // console.info('container App', this);
        return this.props.children;
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.contacts;
}

export default connect(mapStateToProps)(App);
