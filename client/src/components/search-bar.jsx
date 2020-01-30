import React, { Component } from 'react'
import {SearchContext} from '../store/SearchProvider'

export default class SearchBar extends Component {

    static contextType = SearchContext

    constructor(props) {
        super(props)
    }

    handleChange(event) {
        this.context.fetchResults(event.target.value)
    }

    render() {
       return (
            <input
            type="text"
            placeholder="Search..."  onChange={this.handleChange.bind(this)} />
       )
    }
}