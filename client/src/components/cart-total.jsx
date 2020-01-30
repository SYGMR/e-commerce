// import React from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


class CartTotal extends React.Component {
        
    render() {
        let total = this.props.shopItems.map(item => item.price * item.quantity).reduce((accumulator, currentValue) => (accumulator + currentValue))        

        return (
            <div>
                <h2>TOTAL</h2>
                <h3>Livraison :</h3>
                <h3>Total à payer: {total}</h3>
                <div>
               
                <Link to= '/checkout'><button className="payment">Order</button></Link>
                </div>
                <div id="credit-cards">
                    <img src="/SVG/credit-card-maestro.svg" alt="#" style={{ width: '40px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-master.svg" alt="#" style={{ width: '40px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-american-express.svg" alt="#" style={{ width: '50px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-visa.svg" alt="#" style={{ width: '60px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-paypal.svg" alt="#" style={{ width: '70px' }} className="credit-card"></img>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

export default connect(mapStateToProps)(CartTotal);