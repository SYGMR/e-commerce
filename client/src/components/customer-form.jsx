import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerCustomer} from '../actions/users';
import Input from './input';
import '../index.css';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import {Link} from 'react-router-dom';




export class CustomerForm extends React.Component {
   

    onSubmit(values) {          

        const {firstname, lastname, address } = values;
        const customer = {firstname, lastname, address };
        if(this.props.user !== null) {
            customer.user = "/api/users/" + this.props.user.id
        }
        return this.props
            .dispatch(registerCustomer(customer))
    }

    render() {
        return (

            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Order Form</h2>
                <Field
                    component={Input}
                    type="text"
                    placeholder="Firstname"
                    name="firstname"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="text"
                    placeholder="adress"
                    name="address"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                {/* <Field
                    component={Input}
                    type="Text"
                    placeholder="Code Postal"
                    name="cp"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="Text"
                    placeholder="Ville"
                    name="ville"
                    validate={[required, nonEmpty, isTrimmed]}
                /> */}
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
            
        );
    }
}

export default reduxForm({
    form: 'customer',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('customer', Object.keys(errors)[0]))
})(CustomerForm);