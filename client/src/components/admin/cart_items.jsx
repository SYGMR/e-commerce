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

export const Edit = props => (
	<EditGuesser  {...props}>
		
	</EditGuesser >
);

export const Create = props => (
	<CreateGuesser {...props}>
		 <ReferenceFieldController label="Customer" reference="customer" source="customer" linkType={false}>
			{({referenceRecord, ...props}) => (
				<ReferenceField basePath="/customer" resource="customer" reference="customer" record={referenceRecord || {}} linkType="show">
					<TextField source="name" />
				</ReferenceField>
			)}
		</ReferenceFieldController>
		<ReferenceInput
			source="product"
			reference="products"
			filterToQuery={searchText => ({ name: searchText })}
		>
			<AutocompleteInput optionText="name" />
		</ReferenceInput>
	</CreateGuesser>
);

export const List = props => (
	<ListGuesser {...props}>
		
	</ListGuesser>
);

export const Show = props => (
	<ShowGuesser {...props}>
		
	</ShowGuesser>
);