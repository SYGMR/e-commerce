import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { Galaxy } from './galaxy';

class  LandingPage extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
		  categories: [],
		};
	 
	}
	  componentDidMount() {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			},
		})
		  .then(response => response.json())
		  .then(data => this.setState({ hits: data.categories }));
	  }

	  render() {
		const { categories } = this.state;
		return (
		 // <ul>
			//{categories.map(category=>
			 // <li><Link to='#'>{category.name}</Link></li>
			//)}
		 // </ul>
		 <Galaxy />
		);
	  }
	}

	

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
