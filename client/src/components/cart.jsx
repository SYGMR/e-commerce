import React from 'react';
import CartItem from './cart-item';

import { connect } from 'react-redux';

class Cart extends React.Component {

    checkout() {
        alert("Guigui creatteur de la Galaxie ! Test ")
    }

    render() {
        // let error;
        // if (this.state.error) {
        //     error = (
        //         <div className="cart-error" aria-live="polite">
        //             {this.state.error}
        //         </div>
        //     );
        // }
        if (this.props.cart.length > 0) {
            let shopItems = this.props.cart.map((shopItem, index, array) => ({
                ...shopItem,
                quantity: array.filter(shopItemB => shopItem.id === shopItemB.id).length
            }))
            shopItems = shopItems.filter((shopItem, index, self) => index === self.findIndex(shopItemB => shopItem.id === shopItemB.id))
             return (
            <div>
                <div className="Cart-Left">
                    <h2>MON PANIER</h2>
                    {shopItems.map(item => (
                        <>
                            <CartItem product={{...item}} key={item.id} />
                        </>
                    ))}
                    
                </div>
                <div className="Cart-Right">
                    <h2>TOTAL</h2>
                    <h3>Livraison :</h3>
                    <h3>Sous Total :</h3>
                    <button className="payment" onClick={this.checkout}>Payment</button>
                    <div id="credit-cards">
                        <img src="/SVG/credit-card-maestro.svg" alt="#" style={{width: '40px'}} className="credit-card"></img>
                        <img src="/SVG/credit-card-master.svg" alt="#" style={{width: '40px'}} className="credit-card"></img>
                        <img src="/SVG/credit-card-american-express.svg" alt="#" style={{width: '50px'}} className="credit-card"></img>
                        <img src="/SVG/credit-card-visa.svg" alt="#" style={{width: '60px'}} className="credit-card"></img>
                        <img src="/SVG/credit-card-paypal.svg" alt="#" style={{width: '70px'}} className="credit-card"></img>
                    </div>      
                </div>
            </div>
        );
        } else {
            return (
                 <div className="cart-error" aria-live="polite">
                    <h6>Panier Vide !!!</h6>
                </div>
            )
           
        }
    }
}

const mapStateToProps = state => ({
	cart: state.cart
});

export default connect(mapStateToProps)(Cart);
