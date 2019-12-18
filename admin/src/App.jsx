import React from 'react';
import { HydraAdmin, ResourceGuesser } from '@api-platform/admin';

export default () => (
	<HydraAdmin entrypoint={process.env.REACT_APP_API_ENTRYPOINT}>
		<ResourceGuesser name="carts" />
		<ResourceGuesser name="cart_items" />
		<ResourceGuesser name="categories" />
		<ResourceGuesser name="customers" />
		<ResourceGuesser name="merchants" />
		<ResourceGuesser name="products" />
		<ResourceGuesser name="sellers" />
		<ResourceGuesser name="seller_items" />
		<ResourceGuesser name="shops" />
		<ResourceGuesser name="shop_items" />
		<ResourceGuesser name="statuses" />
		<ResourceGuesser name="users" />
	</HydraAdmin>
);
