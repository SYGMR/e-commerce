import React, { Component } from 'react'
import SearchBar from './search-bar'
import SearchResult from './search-result'
import {SearchContext} from '../store/SearchProvider'

export default class SearchResults extends Component {

    static contextType = SearchContext

    render() {
        if(this.context.loading === false) {
            if (this.context.results.length >= 1) {
                return (
                    <div ref={this.mount} className="resultSearchBar">
                        {this.context.results.map(result =>
                            <SearchResult {...result} />
                        )}
                    </div>
                )
            } else {
                return null
            }
        }
        else if(this.context.loading === true) {
            return "Loading..."
        } else {
            return null
        }
    }
}