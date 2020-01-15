import React from 'react';
import Cart from './cart';

import { connect } from 'react-redux';

export default class CartPage extends React.Component {
    render() {
        return (
            <div className="cart">
                <h2>Pannier</h2>
                <Cart />
            </div>
        );
    }
}
