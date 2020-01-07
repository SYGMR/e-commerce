import React from 'react';
import { connect } from 'react-redux';

export default class Product extends React.Component {
    render() {
        return (
            <div className="Product">
                <img src={this.props.product.images} />
                <div className="Content">
                    <h1>{this.props.product.name}</h1>
                    <span><strong>Prix : </strong>€ {this.props.product.price}</span>
                    <span><strong>Description : </strong>{this.props.product.description}</span>
                    <button>Ajouter au panier</button>
                </div>
            </div>
        );
    }
}
