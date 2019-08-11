import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/Checkoutsummary'
import ContactData from './Contact/ContactData';
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
class Checkout extends Component {
    // state ={
    //     ingredients : null
    // }
    // exp = () => {
    //     this.props.history.push()
    // }
    // componentWillMount() {
    //     console.log(this.props)
    //     const query =  new URLSearchParams(this.props.location.search);
    //     const ingredient = {}
    //     for(let param of query.entries()){
    //         //['salad','1']
    //         ingredient[param[0]] = +param[1]
    //     }
    //     this.setState({ingredients:ingredient})
    // }
    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-details')
        // this.props.history.push('/checkout/')
    }
    render() {
        let summary = <Redirect to = "/"/>
        if(this.props.ing){
            summary = (
                <div>
                    <CheckoutSummary ingredients={this.props.ing}
                                checkoutCancel={this.checkoutCancelHandler}
                                checkoutContinue={this.checkoutContinueHandler}/>
                    <Route path={this.props.match.url + '/contact-details'} 
                        component={ContactData}/>
                </div>
               
            )
        }
        return (
            <div>
                {summary}
            </div>
        )
    }
}
const mapStateToProps =  state => {
    return{
        ing : state.burgerBuilder.ingredients
    }
}
export default connect(mapStateToProps)(Checkout) 