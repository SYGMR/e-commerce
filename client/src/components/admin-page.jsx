import React from 'react';

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_CHECK } from 'react-admin';

import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import requiresLogin from './requires-login';

import { 
	HydraAdmin, 
	ResourceGuesser,
	dataProvider as baseDataProvider, 
	fetchHydra as baseFetchHydra 
 } from '@api-platform/admin';

import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';

import {
	ShoppingCart, 
	AddShoppingCart, 
	Class, 
	Person, 
	VerifiedUser, 
	Apps, 
	RecordVoiceOver, 
	FormatListBulleted, 
	Store, 
	GridOn
} from '@material-ui/icons';

import * as Carts from './admin/carts';
import * as CartItems from './admin/cart_items';
import * as Categories from './admin/categories';
import * as Customers from './admin/customers';
import * as Merchants from './admin/merchants';
import * as Products from './admin/products';
import * as SellerItems from './admin/seller_items';
import * as Sellers from './admin/sellers';
import * as ShopItems from './admin/shop_items';
import * as Shops from './admin/shops';
import * as Users from './admin/users';

import UsersIcon from '@material-ui/icons/Group';

import {clearAuth} from '../actions/auth';

const entrypoint = process.env.REACT_APP_API_BASE_URL;
const fetchHydra = (url, options = {}) => baseFetchHydra(url, {
		...options,
		headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`}),
});
const apiDocumentationParser = entrypoint => parseHydraDocumentation(entrypoint, { headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`}) })
		.then(
				({ api }) => ({api}),
				(result) => {
						switch (result.status) {
								case 401:
										return Promise.resolve({
												api: result.api,
												customRoutes: [{
														props: {
																path: '/',
																render: () => <Redirect to={`/login`}/>,
														},
												}],
										});

								default:
										return Promise.reject(result);
						}
				},
		);

const authProvider = function(type, params) {
	if (type === AUTH_LOGIN) {
	 
	}
	if (type === AUTH_LOGOUT) {
		this.props.dispatch(clearAuth());
		localStorage.removeItem("token")
		localStorage.removeItem("refreshToken")
		return Promise.resolve();
	}
	if (type === AUTH_ERROR) {
		// ...
	}
	if (type === AUTH_CHECK) {
		return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
	}
	if (type === AUTH_GET_PERMISSIONS) { // TODO
		console.log(this.props.roles)
		return Promise.resolve(this.props.roles);
	}
	return Promise.reject('Unknown method');
};

const dataProvider = baseDataProvider(entrypoint, fetchHydra, apiDocumentationParser);

export class AdminPage extends React.Component {
	render() {
		if(this.props.roles.includes("ROLE_ADMIN") === false) {
			return "Unauthorized access"
		}
		return (
			<HydraAdmin
				loginPage={false}
				apiDocumentationParser={ apiDocumentationParser }
				dataProvider={ dataProvider }
				authProvider={ authProvider.bind(this) }
				entrypoint={ entrypoint }
			>
				<ResourceGuesser name="carts" 
					list={Carts.List}
					create={Carts.Create}
					edit={Carts.Edit}
					show={Carts.Show}
					icon={ShoppingCart} 
				/>
				<ResourceGuesser name="cart_items" 
					list={CartItems.List}
					create={CartItems.Create}
					edit={CartItems.Edit}
					show={CartItems.Show}
					icon={AddShoppingCart}
				/>
				<ResourceGuesser name="categories" 
					list={Categories.List}
					create={Categories.Create}
					edit={Categories.Edit}
					show={Categories.Show}
					icon={Class} 
				/>
				<ResourceGuesser name="customers" 
					list={Customers.List}
					create={Customers.Create}
					edit={Customers.Edit}
					show={Customers.Show}
					icon={Person} 
				/>
				<ResourceGuesser name="merchants" 
					list={Merchants.List}
					create={Merchants.Create}
					edit={Merchants.Edit}
					show={Merchants.Show}
					icon={VerifiedUser} 
				/>
				<ResourceGuesser name="products" 
					list={Products.List}
					create={Products.Create}
					edit={Products.Edit}
					show={Products.Show}
					icon={Apps} 
				/>
				<ResourceGuesser name="sellers" 
					list={Sellers.List}
					create={Sellers.Create}
					edit={Sellers.Edit}
					show={Sellers.Show}
					icon={RecordVoiceOver} 
				/>
				<ResourceGuesser name="seller_items" 
					list={SellerItems.List}
					create={SellerItems.Create}
					edit={SellerItems.Edit}
					show={SellerItems.Show}
					icon={FormatListBulleted}
				/>
				<ResourceGuesser name="shops" 
					list={Shops.List}
					create={Shops.Create}
					edit={Shops.Edit}
					show={Shops.Show}
					icon={Store}
				/>
				<ResourceGuesser name="shop_items" 
					list={ShopItems.List}
					create={ShopItems.Create}
					edit={ShopItems.Edit}
					show={ShopItems.Show}
					icon={GridOn} 
				/>
				<ResourceGuesser name="users" 
					list={Users.List}
					create={Users.Create}
					edit={Users.Edit}
					show={Users.Show}
					icon={UsersIcon}
				/>
			</HydraAdmin>	
		);
	}
}

const mapStateToProps = state => {
	const {currentUser} = state.auth;
	return {
		username: currentUser.username,
		email: currentUser.email,
		roles: currentUser.roles
	};
};

export default requiresLogin()(connect(mapStateToProps)(AdminPage));