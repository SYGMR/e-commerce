import React, { createContext, Component } from 'react'
import SearchBar from './search-bar'
import SearchProvider from '../store/SearchProvider'
import SearchResults from './search-results'

export default class Search extends Component {
    render() {
        return (
            <div id="containerSearch">
                <SearchProvider>
                    <SearchBar />
                    <SearchResults />
                </SearchProvider>
            </div>
        )
    }
}