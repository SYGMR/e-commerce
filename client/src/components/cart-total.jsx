// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { connect } from 'react-redux';
import CartItem from './cart-item';
import Cart from './cart';
import {Link} from 'react-router-dom';



class CartTotal extends React.Component {
    checkout() {
        alert("Cets module est en cours de developpement !!! ")
    }
    render() {
        let total = this.props.shopItems.map(item => item.price * item.quantity).reduce((accumulator, currentValue) => (accumulator + currentValue))

        // let total = this.props.product.price * this.props.product.quantity
        

        return (
            //  <div className="Product">
            //         <div style={{width: 100}}>
            //             {/* <img style={{width: '100%', borderRadius: 5 }} src={this.props.product.image[0]} /> */}
            //         </div>

            //     <div className="Content">
            //         <h1>{this.props.product.name}</h1> 
            //         <span><strong>Prix : </strong> {this.props.product.price} &euro;</span><br></br>
            //         <span><strong>Description : </strong>{this.props.product.description} </span>
            //         <div><strong>x : </strong>{this.props.product.quantity} </div>

            //     </div>
            //     <img src="/SVG/trash.svg" onClick={() => {
            //          this.props.dispatch({
            //             type: "DELETE_PRODUCT",
            //             product: this.props.product
            //         })
            //     }} className="icon" alt='#'/>
            //     <br></br>
            // </div>

            <div>
                <h2>TOTAL</h2>
                <h3>Livraison :</h3>
                <h3>Total à payer : {total} &euro;</h3>
                <Link to= '/checkout'><button className="payment" onClick={this.checkout}>Payment</button></Link>
                <div id="credit-cards">
                    <img src="/SVG/credit-card-maestro.svg" alt="credit-card-maestro" style={{ width: '40px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-master.svg" alt="credit-card-master" style={{ width: '40px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-american-express.svg" alt="credit-card-american-express" style={{ width: '50px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-visa.svg" alt="credit-card-visa" style={{ width: '60px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-paypal.svg" alt="credit-card-paypal" style={{ width: '70px' }} className="credit-card"></img>
                </div>
            </div>




        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

export default connect(mapStateToProps)(CartTotal);