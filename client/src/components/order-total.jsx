// import React from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {CheckoutContext} from '../store/CheckoutProvider'


class Total extends React.Component {

    static contextType = CheckoutContext

    postData(event) {   
        event.preventDefault()
        this.context.confirm()
    }

    render() {
        let total = this.context.cartItems.map(item => item.price * item.quantity).reduce((accumulator, currentValue) => (accumulator + currentValue)) 
        return (
            <div>
                <form onSubmit={this.postData.bind(this)}>
                     <h4>Detaille de Votre Command</h4>
                     <div>
                        <h4>{this.context.customer.firstname}</h4>
                    </div>
                    <div>
                        <h4>{this.context.customer.lastname}</h4>
                    </div>
                    <div>
                        <h4>{this.context.customer.lastname}</h4>
                    </div>
                    <div>

                    {/* <h1>{this.props.product.name}</h1> 
                    <span><strong>Prix unité: </strong> {this.props.product.price} &euro;</span><br></br>
                    <span><strong>Description : </strong>{this.props.product.description} </span>
                    <div><strong>x : </strong>{this.props.product.quantity} </div>
                    <div><strong>Prix total : </strong>{this.props.product.price*this.props.product.quantity} &euro;</div>   */}

                        <h4>Resume du Panier</h4>
                        {this.context.cartItems.map(cartItem => (
                            <div>
                                <span><strong>Nom de Produit : </strong> {cartItem.name}</span><br></br>
                                <span><strong>Prix unité: </strong> {cartItem.price} &euro;</span><br></br>
                                <div><strong>x : </strong>{cartItem.quantity}</div>
                            </div>
                        ))}
                        <div><strong>Prix total : </strong>{total} &euro;</div>
                    </div>
                    
                    <div className="button">
                        {/** MODIF */}
                        <button>Confirm and Pay</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
});


export default connect(mapStateToProps)(Total);