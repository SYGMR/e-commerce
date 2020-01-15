// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { connect } from 'react-redux';

export default class CartItem extends React.Component {
    render() {
        return (
            <div className="Product">
                    <div style={{width: 100}}>
                        <img style={{width: '100%', borderRadius: 5 }} src={this.props.product.image[0]} />
                    </div>

                <div className="Content">
                    <h1>{this.props.product.name}</h1> 
                    <span><strong>Prix : </strong> {this.props.product.price} &euro;</span><br></br>
                    <span><strong>Description : </strong>{this.props.product.description} </span>
                    
                </div>
                <img src="/SVG/trash.svg" className="icon" alt='#'/>
                <br></br>
            </div>
        );
    }
}

