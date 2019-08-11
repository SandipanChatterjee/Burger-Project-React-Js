import * as actionTypes from './actionTypes'
import axios from '../../Axios-order'

export const addIngredient = (name) => {
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}

export const fetchIngredientFail = () => {
    return{
        type : actionTypes.FECTH_INGREDIENT_FAIL
    }
}
export const setIngredients = (ingredients) => {
    return{
        type:actionTypes.SET_INGREDIENT,
        ingredients : ingredients
    }
} 
export const initIngredient = () => {
    return dispatch => {
         axios.get('https://udemy-react-burgerproject.firebaseio.com/ingredients.json')
        .then(res=>{
            dispatch(setIngredients(res.data))
        })
        .catch(error => {
            dispatch(fetchIngredientFail)
        })
    }
}

