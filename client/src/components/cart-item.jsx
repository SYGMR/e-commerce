// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {ShopPage} from './shop-page';

class CartItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quantityItem: []
        }
    }

    
    // componentDidMount(){
    //     // /api/shops/{id}/items
    //     fetch(`${process.env.REACT_APP_API_BASE_URL}/shops`)
    //     .then(res => res.json())
    //     .then(res => {
    //          this.setState({
    //             quantityItem: res["hydra:member"]
    //          })
    //          console.log("Res : ",res);
    //     })
    // }

    render() {
        console.log()
        
        return (
            
             <div className="Product">
                    <div style={{width: 100}}>
                        {/* <img style={{width: '100%', borderRadius: 5 }} src={this.props.product.image[0]} /> */}
                    </div>

                <div className="Content">
                    <h1>{this.props.product.name}</h1> 
                    <span><strong>Prix unité: </strong> {this.props.product.price} &euro;</span><br></br>
                    <span><strong>Description : </strong>{this.props.product.description} </span>
                    <div><strong>x : </strong>{this.props.product.quantity} </div>
                    <div><strong>Prix total : </strong>{this.props.product.price*this.props.product.quantity} &euro;</div>   
                    {/* <button onClick={() => this.props.addCart( this.props.product)}>add</button> */}

                </div>
                <img src="/SVG/trash.svg" onClick={() => {
                     this.props.dispatch({
                        type: "DELETE_PRODUCT",
                        product: this.props.product
                    })
                }} className="icon" alt='#'/>
                <br></br>
                <img src="/SVG/house.svg" onClick={() => {
                     this.props.dispatch({
                        type: "ADD_PRODUCT",
                        product: this.props.product
                    })
                }} className="icon_2" alt='#'/>   
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
});

export default connect(mapStateToProps)(CartItem);