import React from 'react';
import CartItem from './cart-item';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
import { connect } from 'react-redux';
import CartTotal from './cart-total';
import { registerCard } from '../actions/users';
import Input from './input';
import { Field, reduxForm, focus } from 'redux-form';


class PaymentMethod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardNumber: "",
            expiryMonth: "",
            expiryYear: "2020",
            cvv: ""
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    onSubmit(values) {          
        console.log("test")

        const {cardNumber, expiryMonth, expiryYear, cvv} = values;
        const cardInfo = {cardNumber, expiryMonth, expiryYear, cvv};
        if(this.props.user !== null) {
            cardInfo.user = "/api/users/" + this.props.user.id
        }
        return this.props
            .dispatch(registerCard(cardInfo))
    }

    render() {

        return (
            <>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div class="container">
                    <div class="card__container">
                        <div class="card">
                            <div class="row paypal">
                                <div class="left">
                 
                                


                                </div>
                                <div class="right">
                                    <img src="http://i68.tinypic.com/2rwoj6s.png" alt="paypal" />
                                </div>
                            </div>
                            <div class="row credit">
                                <div class="left">


                                    {/** MODIF */}
                                    <input onChange={this.handleChange.bind(this)} id="cd" type="radio" name="payment" />
                                    <div class="radio"></div>
                                    <label for="cd">Debit/ Credit Card</label>



                                </div>
                                <div class="right">
                                    <img src="http://i66.tinypic.com/5knfq8.png" alt="visa" />
                                    <img src="http://i67.tinypic.com/14y4p1.png" alt="mastercard" />
                                    <img src="http://i63.tinypic.com/1572ot1.png" alt="amex" />
                                    <img src="http://i64.tinypic.com/2i92k4p.png" alt="maestro" />
                                </div>
                            </div>
                            <div class="row cardholder">
                                <div class="info">


                                    {/** MODIF */}
                                    <label for="cardholdername">Name</label>
                                    <input onChange={this.handleChange.bind(this)} placeholder="e.g. Richard Bovell" id="cardholdername" type="text" />

                                </div>
                            </div>
                            <div class="row number">
                                <div class="info">


                                    {/** MODIF */}
                                    <label for="cardnumber">Card number</label>
                                    <input onChange={this.handleChange.bind(this)} name="cardNumber" id="cardNumber" type="text" pattern="[0-9]{16,19}" maxlength="19" placeholder="8888-8888-8888-8888"
                                        value={this.state.card} />



                                </div>
                            </div>
                            <div class="row details">
                                <div class="left">
                                    <label for="expiry-date">Expiry</label>


                                    {/** MODIF */}
                                    <select onChange={this.handleChange.bind(this)} name="expiryMonth" id="expiry-date" value={this.state.expiryMonth}>
                                        <option>MM</option>
                                        <option value="1">01</option>
                                        <option value="2">02</option>
                                        <option value="3">03</option>
                                        <option value="4">04</option>
                                        <option value="5">05</option>
                                        <option value="6">06</option>
                                        <option value="7">07</option>
                                        <option value="8">08</option>
                                        <option value="9">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <span>/</span>


                                    {/** MODIF */}
                                    <select name="expiryYear" id="expiry-date" onChange={this.handleChange.bind(this)} value={this.state.expiryYear}>
                                        <option>YYYY</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                    </select>





                                </div>
                                <div class="right">


                                    {/** MODIF */}
                                    <label for="cvv">CVC/CVV</label>
                                    <input name="cvv" onChange={this.handleChange.bind(this)} type="text" maxlength="4" placeholder="123" value={this.state.cvv} />




                                    <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card." data-balloon-pos="up">i</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button">


                        {/** MODIF */}
                        <button>Confirm and Pay</button>

                        </div>
                    </div>
                </form>
            </>

        )

    }
}

export default reduxForm({
    form: 'card',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('card', Object.keys(errors)[0]))
})(PaymentMethod);
