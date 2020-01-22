import React from 'react';
import {Link} from 'react-router-dom';

export default class ShopPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shops: []
        }
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/shops?category=${this.props.match.params.id}`)
        .then(res => res.json())
        .then(res => {
             this.setState({
                shops: res["hydra:member"]
             })             
        })
    }

    render() {
        let shops = this.state.shops.map(shop => (
            <h4  key={shop.id}><Link to={`/category/${this.props.match.params.id}/shop/${shop.id}`}>{shop.name}</Link></h4>
        ))
        return <>
        <h2>SHOPS</h2>
        {shops}
        </>
        ;
    }
}