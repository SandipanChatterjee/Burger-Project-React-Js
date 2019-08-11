import React, { Component } from 'react';
import {connect} from 'react-redux'

import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler.js/withErrorHandler'
//++EXP
//import * as actionType from '../../Store/actions/actionTypes';
import * as burgerBuilderAction from '../../Store/actions/index'



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ++EXP
        //ingredients: null,
        //totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        loading : false,
        
    }
    componentDidMount(){
        console.log(this.props)
        // axios.get('https://udemy-react-burgerproject.firebaseio.com/ingredients.json')
        // .then(res=>{
        //     this.setState({ingredients:res.data})
        // })
        // .catch(error => {console.log(error)})
        // EXP this.onStoreIngredient()
        this.props.onInitIngredients()
    }
    // updatePurchaseState (ingredients) {
    //     const sum = Object.keys( ingredients )
    //         .map( igKey => {
    //             return ingredients[igKey];
    //         } )
    //         .reduce( ( sum, el ) => {
    //             return sum + el;
    //         }, 0 );
    //     this.setState( { purchasable: sum > 0 } );
    // }

    // addIngredientHandler = ( type ) => {
    //     const oldCount = this.props.ing[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ing
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = ( type ) => {
    //     const oldCount = this.props.ing[type];
    //     if ( oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ing
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if(this.state.isAuthenticated){
            this.setState({purchasing: true});
            
        }else{
            //EXP this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
       
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
        this.props.history.push('/')
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render () {
        const disabledInfo = {
            ...this.props.ing
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        
        let orderSummary = <Spinner/>
        let burger = <Spinner />
        if(this.props.ing){
            orderSummary = <OrderSummary 
                                ingredients={this.props.ing}
                                price={this.props.price}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}/>
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        //++ EXP ingredientAdded={() => this.props.onAddIngredient()}
                        // EXP
                            ingredientAdded={this.props.onAddIngredient}
                            ingredientRemoved={this.props.onRemoveIngredient}
                        //........
                        disabled={disabledInfo}
                        purchasable={this.props.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.price} 
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            )
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
    }
}
// EXP ....
const mapStateToProps = state => {
    return{
        ing : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        purchasable : state.burgerBuilder.purchasable,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onAddIngredient : (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
        onRemoveIngredient : (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(burgerBuilderAction.initIngredient()),
        onSetRedirectPath : (path) => dispatch(burgerBuilderAction.setAuthRedirectPath(path))
        
        // EXP onStoreIngredient : () => dispatch(burgerBuilderAction.getIngredient())

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));