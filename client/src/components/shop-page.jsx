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
            <div> 
            <Link to={`/category/${this.props.match.params.id}/shop/${shop.id}`}>
            <img src='https://fakeimg.pl/120x120/282828/F2F4F3' alt=""/>
            <h4 key={shop.id}>{shop.name}</h4>
            </Link>
            
        </div>
        ))
        return <>
        <h2>SHOPS</h2>
        <section id="shopList">{shops}</section>
        </>
        ;
    }
}