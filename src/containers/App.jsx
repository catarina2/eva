import {Component} from 'react';
import {connect} from 'react-redux';

//
class App extends Component {
    componentDidMount() {
        //const {dispatch} = this.props;
        //dispatch(fetchLists());
    }

    render() {
        //console.info('container App', this);
        return this.props.children;
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container App mapStateToProps', state, ownProps);
    return state.lists;
}

export default connect(mapStateToProps)(App);
