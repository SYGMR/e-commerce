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
				<Link to="/"><h1 id="logo">UNIVERSHOP</h1></Link>
				<ul>
				<li><Link to="/cart"><img src="/SVG/basket.svg" className="icon" alt="#" /></Link></li>
				{this.props.currentUser === null ?
					<>
						<li><Link to="/login"><img src="/SVG/user.svg" className="icon" alt="#" /></Link></li>
					</>
				: [
					this.props.currentUser.roles.includes("ROLE_ADMIN") && (
						<li><a href="/admin" target="_blank">Admin</a></li>
					),
					<>
					<li><Link to="/dashboard">Dashboard</Link></li>
					<li><button onClick={() => this.logOut()}>Log out</button></li>
					</>
				 ]
				}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HeaderBar);
