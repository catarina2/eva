import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { find } from 'lodash';

import {putContact} from '../actions';

class Edit extends Component {
    constructor(props) {
        super(props);
        this._submit = this._submit.bind(this);
    }

    render() {
        console.info('container Edit', this.props);
        const htmlNotFound = <p>Not found...</p>; 
        const htmlButtonBack = <Link to="/">Voltar à lista</Link>;

        if (!this.props.item) {
            return <div>{htmlNotFound}{htmlButtonBack}</div>;
        } else {
            const {nome, phone, address, mail, photo} = this.props.item;

            return (
                <div>
                    <form id="form" method="PUT" onSubmit={this._submit}>
                        <input type="text" name="nome" placeholder="nome" defaultValue={nome} />
                        <input type="text" name="phone" placeholder="phone" defaultValue={phone} />
                        <input type="text" name="address" placeholder="address" defaultValue={address} />
                        <input type="text" name="mail" placeholder="mail" defaultValue={mail} />
                        <button type="submit">Edit</button>
                    </form>
                </div>
            )
        }
    }

    _submit(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        const form = document.querySelector('#form');
        const data = new FormData(form);

        let obj = {};
        for (var pair of data.entries()) {
            obj[pair[0]] = pair[1];
        }

        console.log(obj);

        dispatch(putContact(this.props.params.id, obj));
    }
}

Edit.propTypes = {
    items: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    // console.info('container Edit mapStateToProps', state, ownProps);
    return {item: find(state.contacts.items, (item) => { return item.id === parseInt(ownProps.params.id, 10); })}
};

export default connect(mapStateToProps)(Edit)
