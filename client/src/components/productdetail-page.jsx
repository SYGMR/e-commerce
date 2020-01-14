import React from 'react';
import {Link} from 'react-router-dom';

export default class DetailsProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            productdetail: []
        }
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products?id=${this.props.match.params.product_id}`)
        .then(res => res.json())
        .then(res => {
             this.setState({
                productdetail: res["hydra:member"]
             })             
             console.log(res)
        })
    }

    render() {
  
        const Products = this.state.productdetail.map(product => (
            <div key={product.id}>
            <h2>{product.name}</h2>
            <h4>{product.description}</h4>
            <h4>{product.price}</h4>
            <h4>{product.images}</h4>
            <button>Add</button>
            </div>
        ))
        return <>
            <h2>Products</h2>
            {Products}
        </>
        ;
    }

}