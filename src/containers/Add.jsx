import React, {Component} from 'react';
import {connect} from 'react-redux';

import {postContact} from '../actions';

class Add extends Component {
    constructor(props) {
        super(props);
        this._submit = this._submit.bind(this);
    }

    render() {
        // console.info('container Add', this.props);
        return (
            <div>
                <form id="form" method="POST" onSubmit={this._submit}>
                    <input type="text" name="nome" placeholder="nome" />
                    <input type="text" name="phone" placeholder="phone" />
                    <input type="text" name="address" placeholder="address" />
                    <input type="text" name="mail" placeholder="mail" />
                    <input type="file" name="photo" />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }

    _submit(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        const form = document.querySelector('#form');
        const data = new FormData(form);
        dispatch(postContact(data));
    }
}

export default connect()(Add);
