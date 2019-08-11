import React from 'react'
import classes from './Order'
const order = (props) => {
    console.log(props)
    const ingredients = []
    for(let i in props.ingredients){
        ingredients.push({
            name : i,
            amount : props.ingredients[i]
        })
    }
    const ingredientOutput = ingredients.map(ig => (
        <span>{ig.name} {ig.amount}</span>
    ))
    console.log(ingredients)
    return(
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Total price {props.price}</p>
        </div>
        
    )
}

export default order