
import React from 'react';
import {Link} from 'react-router-dom';

export default class ProductPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopItems: []
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

    chemin() {

    }

    addToCart(id){
        // if(Meteor.userId()){
            // this.state.productsList.forEach(product => {
            //     if(id == product._id)
            //         Carts.insert({
            //             id:product.id,
            //             itemName: product.itemName,
            //             itemDesc:product.itemDesc,
            //             uploadedAt:new Date().getTime(),
            //             price:product.price,
            //             addedBy:Meteor.userId()
            //         });
            // });
        // }else{
            // console.log('Please login to add this product');
        // }
        console.log("add to cart");
    }
   

    render() {
        const shop_items = this.state.shopItems.map(shopItem => (
            
            <div key={shopItem.product.id}>
                <h2><Link to={`/product/${shopItem.product.id}`}>{shopItem.product.name}</Link></h2>
                <h4>{shopItem.product.description}</h4>
                <h3>{shopItem.product.price}</h3>
                <button onClick={this.addToCart.bind(this, shopItem.product.id)}>Add to Cart</button>
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