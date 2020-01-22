import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';

class ProductPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopItems: [],
        }
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/shop_items?shop=${this.props.match.params.shop_id}`)
        .then(res => res.json())
        .then(res => {
             this.setState({
                shopItems: res["hydra:member"]
             })
        })
    }

    addCart(product) {
        this.props.dispatch({
            type: "ADD_PRODUCT",
            product: {...product, quantity: 1}
        })
        // let cart = JSON.parse(localStorage.getItem("cart"))
        // if (Array.isArray(cart) === false) {
        //     cart = []
        // }
        // cart.push(product)
        //  // sauvegarde les modifications
        // localStorage.setItem("cart", JSON.stringify(cart))
        // fetch(`${process.env.REACT_APP_API_BASE_URL}/cart_items`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
        //         cart:"/api/carts/2",
        //         quantity:1,
        //         product:`/api/products/${productId}`})
        // })
    }

    render() {
        const shop_items = this.state.shopItems.map(shopItem => (
            
            <div key={shopItem.product.id}>
            <h2><Link to={`/product/${shopItem.product.id}`}>{shopItem.product.name}</Link></h2>
            <h4>{shopItem.product.description}</h4>
            <h3>{shopItem.product.price}</h3>

            <button onClick={() => this.addCart(shopItem.product)}>add</button>
            </div>
        ))
        return (
            <>
            <h2>PRODUCTS</h2>
            {shop_items}
            </>
            )
        ;
    }
}

export default connect()(ProductPage);