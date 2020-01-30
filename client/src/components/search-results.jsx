import React, { Component } from 'react'
import SearchResult from './search-result'
import {SearchContext} from '../store/SearchProvider'

export default class SearchResults extends Component {

    static contextType = SearchContext

    render() {
        if(this.context.loading === false) {
            return (
                <div style={{position:"absolute", backgroundColor: "darkslategray"}}>
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