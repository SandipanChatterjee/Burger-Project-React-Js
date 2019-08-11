import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import {withRouter} from 'react-router-dom'
const checkoutSummary = (props) => {
    // const goBack = () => {
    //     props.history.push('/')
    // }
    return(
        <div>
            <h1>We hope it's delicious</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>

        </div>
    )
}

export default withRouter(checkoutSummary)