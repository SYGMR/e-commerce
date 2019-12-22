import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {Link} from 'react-router-dom';

export class HeaderBar extends React.Component {
	logOut() {
		this.props.dispatch(clearAuth());
		localStorage.removeItem("token")
		localStorage.removeItem("refreshToken")
	}

	render() {
		// Only render the log out button if we are logged in
		return (
			<div className="header-bar">
				<h1>Foo App</h1>
				{this.props.loggedIn === false ?
					<ul>
						<li><Link to="/register">Register</Link></li>
						<li><Link to="/login">Login</Link></li>
					</ul>
				: 
					<button onClick={() => this.logOut()}>Log out</button> 
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
