import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'



class SearchResult extends Component {

    constructor(props) {
        super(props)
    }

    addCart(product) {
        this.props.dispatch({
            type: "ADD_PRODUCT",
            product: { ...product, quantity: 1 }
        })
    }

    render() {
        let { id, name, price, description } = this.props
        return (
            <div className="SearchResultItem">
                <img style={{ marginRight: 15, marginLeft: 5, borderRadius: 15 }} src='https://fakeimg.pl/80x80/282828/F2F4F3' alt="" />
                <div>
                    <h4><Link to={`/product/${id}`}>{name}</Link></h4>
                    <p style={{ fontSize: '0.7rem', textAlign: "justify", margin: "5px 0 11px" }}>{description}</p>
                    <div >
                        <p style={{ float: "left" }}>{price} &euro;</p>
                        <button className="addToCart" onClick={() => this.addCart(this.props)}>Ajouter au panier</button>
                    </div>
                </div>
            </div>


        )
    }
}
export default connect()(SearchResult);