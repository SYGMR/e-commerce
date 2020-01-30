import React, { createContext, Component } from "react";

export const SearchContext = createContext();

export default class SearchProvider extends Component {

	constructor(props) {
		super(props);
		this.state = {
            loading: null,
            results: [],
            fetchResults: this.fetchResults.bind(this),
			setResults: results => this.setState({ results })
		}
    }
     
    
    fetchResults(query) {
        this.setState({loading: true})
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products?name=${query}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                loading: false,
                results: res["hydra:member"]
             })             
        })
    }


	render() {
        return (
            <SearchContext.Provider value={this.state}>
                {this.props.children}
            </SearchContext.Provider>
        );
	}
}