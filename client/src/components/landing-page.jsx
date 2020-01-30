import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import  Galaxy  from './galaxy_fiber';
import CategoriesPages from './categories-page';

class  LandingPage extends React.Component{

	  render() {
		return (
		//  <ul>
		// 	{categories.map(category=>
		// 	 <li><Link to='#'>{category.name}</Link></li>
		// 	)}
		//  </ul>
		<CategoriesPages/>
		//  <Galaxy />
		);
	  }
	}

	

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
