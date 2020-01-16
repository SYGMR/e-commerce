import React from 'react';
import {connect} from 'react-redux';

class  LandingPage extends React.Component{

	render() {
		return (
			"Welcome"
		);
	}

}
	

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
