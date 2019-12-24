import React from 'react';

import { 
	HydraAdmin, 
	ResourceGuesser
 } from '@api-platform/admin';

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
	GridOn, 
	Star 
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

export default () => (
	<HydraAdmin entrypoint={process.env.REACT_APP_API_BASE_URL}>
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