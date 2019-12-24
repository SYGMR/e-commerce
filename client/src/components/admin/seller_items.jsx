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