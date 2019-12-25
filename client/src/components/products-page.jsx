import React from 'react';

import {getProducts} from '../actions/products'

export default class ProductsPage extends React.Component {

	componentDidMount() {
		getProducts().then(data => {
			console.log(data)
		})
	}

	render() {
		return (
			<div></div>
		);
	}
}
