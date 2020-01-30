import React, { Component } from 'react'
import SearchBar from './search-bar'
import SearchResult from './search-result'
import {SearchContext} from '../store/SearchProvider'

export default class SearchResults extends Component {

    static contextType = SearchContext

    constructor(props) {
        super(props)
    }

    render() {
        if(this.context.loading === false) {
            return (
                <div className="resultSearchBar">
                    {this.context.results.map(result =>
                        <SearchResult {...result} />
                    )}
                </div>
            )
        }
        else {
            return null
        }
    }
}