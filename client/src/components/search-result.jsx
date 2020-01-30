import React, { Component } from 'react'
import SearchBar from './search-bar'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'



class SearchResult extends Component {
    
    constructor(props) {
        super(props)
    }

    addCart(product) {
        this.props.dispatch({
            type: "ADD_PRODUCT",
            product: {...product, quantity: 1}
        })
    }

    render() {
        let {id, name, price, description} = this.props
        return (
            <div>
                <div>
                    <Link to={`/product/${id}`} />
                </div>
                <div>
                    {name}
                </div>
                <div>
                    {price}
                </div>
                <div>
                    {description}
                </div>
                <div>
                    <button onClick={() => this.addCart(this.props)}>add</button>
                </div>
            </div>
        )
    }
}
export default connect()(SearchResult);