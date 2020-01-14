import React from 'react';
import CartItem from './cart-item';

import { connect } from 'react-redux';

export default class Cart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [
                {
                    id: 1,
                    cart: null,
                    product: {
                        category: null,
                        name: "Rustic Silk Wallet",
                        description: "Ex repellendus sint eos vel.Perspiciatis dignissi...",
                        price: 1306,
                        image: [
                            '/img/imgProduct01.png',
                            '/img/imgProduct02.png',
                            '/img/imgProduct03.png',
                        ]
                    },
                },
                {
                    id: 2,
                    cart: null,
                    product: {
                        category: null,
                        name: "Fantastic Linen Knife",
                        description: "Expedita voluptas recusandae ut. Culpa non ratione...",
                        price: 6554,
                        image: [
                            '/img/imgProduct01.png',
                            '/img/imgProduct02.png',
                            '/img/imgProduct03.png',
                        ]
                    },
                }
            ]

        }
    }

    checkout() {
        alert("Guigui creatteur de la Galaxie ! Test ")
    }


    componentDidMount() {
        //Modifier le id
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/#`);
    }

    render() {
        let error;
        if (this.state.error) {
            error = (
                <div className="cart-error" aria-live="polite">
                    {this.state.error}
                </div>
            );
        }
        if (this.state.items && this.state.items.length > 0) {
            return (
            <div>
                {this.state.items.map(item => (
                    <>
                        <CartItem {...item} key={item.id} />
                    </>
                ))}
                <button onClick={this.checkout}>Payment</button>
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