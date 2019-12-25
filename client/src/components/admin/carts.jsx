import React from 'react';
import { 
	ReferenceInput, 
	ReferenceField, 
	TextField, 
	AutocompleteInput,
	ArrayInput,
	SimpleFormIterator,
	TextInput,
	AutocompleteArrayInput ,
	SelectArrayInput,
	ReferenceFieldController
} from "react-admin";

import { 
	ListGuesser,
	CreateGuesser,
	FieldGuesser,
	EditGuesser,
	InputGuesser,
	ShowGuesser
 } from '@api-platform/admin';


export const Create = props => (
	<CreateGuesser {...props}>
		<ReferenceInput
			source="customer"
			reference="customers"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
	</CreateGuesser>
);

export const Edit = props => (
	<EditGuesser {...props}>
		<ReferenceInput
			source="customer"
			reference="customers"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
	</EditGuesser>
);

export const Show = props => (
	<ShowGuesser {...props}>
		<ReferenceField
			source="customer"
			reference="customers"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<TextField source="name" />
		</ReferenceField>
	</ShowGuesser>
);

export const List = props => (
	<ListGuesser {...props}>
		<ReferenceField
			source="customer"
			reference="customers"
		>
			<TextField source="name" />
		</ReferenceField>
	</ListGuesser>
);