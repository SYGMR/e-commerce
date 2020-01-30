import React from 'react';

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_CHECK } from 'react-admin';

import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import requiresLogin from '../components/requires-login';

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
import UsersIcon from '@material-ui/icons/Group';

import * as UsersGuesser from '../components/users-guesser';

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
					icon={ShoppingCart} 
				/>
				<ResourceGuesser name="cart_items" 
					icon={AddShoppingCart}
				/>
				<ResourceGuesser name="categories" 
					icon={Class} 
				/>
				<ResourceGuesser name="customers" 
					icon={Person} 
				/>
				<ResourceGuesser name="merchants" 
					icon={VerifiedUser} 
				/>
				<ResourceGuesser name="products" 
					icon={Apps} 
				/>
				<ResourceGuesser name="sellers" 
					icon={RecordVoiceOver} 
				/>
				<ResourceGuesser name="seller_items" 
					icon={FormatListBulleted}
				/>
				<ResourceGuesser name="shops" 
					icon={Store}
				/>
				<ResourceGuesser name="shop_items" 
					icon={GridOn} 
				/>
				<ResourceGuesser name="users" 
					list={UsersGuesser.List}
					create={UsersGuesser.Create}
					edit={UsersGuesser.Edit}
					show={UsersGuesser.Show}
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