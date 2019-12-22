import React from 'react';

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

import UserIcon from '@material-ui/icons/Group';

import { 
	HydraAdmin, 
	ResourceGuesser,
	ListGuesser,
	CreateGuesser,
	FieldGuesser,
	EditGuesser,
	InputGuesser
 } from '@api-platform/admin';

 
// ---------------- Categories ----------------//
const CategorieCreate = props => (
	<CreateGuesser {...props}>
	  <InputGuesser source="name" />
	</CreateGuesser>
);

const CategoriesEdit = props => (
	<EditGuesser  {...props}>
	  <InputGuesser  source="name" />
  </EditGuesser >
);

// ---------------- Customers ----------------//



// ---------------- User ----------------//
const UsersEdit = props => (
	<EditGuesser  {...props}>
	  <InputGuesser  source="username" />
	  <InputGuesser  source="email" />
	  <InputGuesser  source="password" value={""} />
	  <InputGuesser  source="roles" />
  </EditGuesser >
);

const UseerCreate = props => (
	<CreateGuesser {...props}>
	  <InputGuesser  source="username" />
	  <InputGuesser  source="email" />
	  <InputGuesser  source="password" />
	  <InputGuesser  source="roles" />
	</CreateGuesser>
);


export default () => (
	<HydraAdmin entrypoint={process.env.REACT_APP_API_BASE_URL}>
		<ResourceGuesser name="carts" 
			icon={ShoppingCart}
		/>
		<ResourceGuesser name="cart_items" 
			icon={AddShoppingCart}
		/>
		<ResourceGuesser name="categories" 
			create={CategorieCreate}
			edit={CategoriesEdit}
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
			icon={GridOn}Star
		/>
		<ResourceGuesser name="statuses" 
			icon={Star}
		/>
		<ResourceGuesser name="users" 
			edit={UsersEdit}
			create={UseerCreate}
			icon={UserIcon}
		/>
	</HydraAdmin>
);