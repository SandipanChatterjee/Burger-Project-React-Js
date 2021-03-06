import * as actionTypes from '../actions/actionTypes'


const initialState = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        error : false,
        building : false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    beef: 1.5
};
const reducer = (state=initialState,action) => {
    console.log(state.totalPrice)
    switch(action.type){
        case actionTypes.ADD_INGREDIENT :     
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                purchasable: state.totalPrice >= 4.0 ? state.purchasable = true : state.purchasable =false,
                building :true
            }
        case actionTypes.REMOVE_INGREDIENT:    
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                purchasable: state.totalPrice >= 4.0 ? state.purchasable = false : state.purchasable =true,
                building:true
            }

        case actionTypes.SET_INGREDIENT: 
            return {
                ...state,
                ingredients : action.ingredients,
                totalPrice : 4,
                error : false,
                building:false
            }
        case actionTypes.FECTH_INGREDIENT_FAIL:
            return{
                ...state,
                error : true
            }
        default: {}
    }
    return state
}

export default reducer