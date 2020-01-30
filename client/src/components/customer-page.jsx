import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import CustomerForm from './customer-form';
import PaymentMethod from './payment-method';

export function CustomerPage(props) {
	if (props.user === null) {
		return <Redirect to="/login" />;
	}
	return (
	<>
		{/* <div className="home">
			<CustomerForm user={props.user} />
		</div> */}
		<div>
			<PaymentMethod/>
		</div>
		</>
		
	);
}

const mapStateToProps = state => ({
	user: state.auth.currentUser
});

export default connect(mapStateToProps)(CustomerPage);

