import {normalizeResponseErrors} from './utils';

export const getProducts = user => {
	return fetch(`${process.env.REACT_APP_API_BASE_URL}/products`)
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
};
