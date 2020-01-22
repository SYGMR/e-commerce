import React from 'react';
import {Link} from 'react-router-dom';

export default class CategoriesPages extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: []
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
            <div> 
                <Link to={`/category/${category.id}`}>
                <img src='https://fakeimg.pl/300x200/282828/F2F4F3' alt=""/>
                <h4 key={category.id}>{category.name}</h4>
                </Link>
                
            </div>
    
))
        return <>
            <h2>CATEGORIES</h2>
            <section id="categoryList">{categories}</section>
            
            </>
        ;
    }
}



