import React from 'react';
import {Link} from 'react-router-dom';

export default class CategoriesPages extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
        }
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`)
        .then(res => res.json())
        .then(res => {
             this.setState({
                categories: res["hydra:member"]
             })
        })
    }

    render() {

    let categories = this.state.categories.map(category => (
    <h4 key={category.id}><Link to={`/category/${category.id}`}>{category.name}</Link></h4>
    
))
        return <>
            <h2>CATEGORIES</h2>
            {categories}
            </>
        ;
    }
}



