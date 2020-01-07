// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { connect } from 'react-redux';



export default class CartItem extends React.Component {
    render() {
        return (
            <div style={{width: '400px'}}  className="Product">
                <Carousel >
                    <div>
                        <img src={this.props.product.image[0]} />
                    </div>
                    <div>
                        <img src={this.props.product.image[1]} />
                    </div>
                    <div>
                        <img src={this.props.product.image[2]} />
                    </div>
                </Carousel>
                <div className="Content">
                    <h1>{this.props.product.name}</h1>
                    <span><strong>Prix : </strong>€ {this.props.product.price} </span>
                    <span><strong>Description : </strong>{this.props.product.description} </span>
                    
                </div>
                <br></br>
            </div>
        );
    }
}

