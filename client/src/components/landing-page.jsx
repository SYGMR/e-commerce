import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export function LandingPage(props) {
	return (
		<div>Hello...</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
