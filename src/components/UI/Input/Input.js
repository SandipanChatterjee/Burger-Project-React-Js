import React from 'react'
import classes from './Input.css'

const input = (props) => {
    console.log(props.changed)
    let inputEl
    switch(props.elementType){
        case ('input') : 
            inputEl = <input className={classes.InputElement}  
            {...props.elementConfig}
            value={props.value} 
            onChange={props.changed} />;
            break;
        case ('textarea') :
            inputEl = <textarea  className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
            break;
        case ('select') :
            inputEl = <select  className={classes.InputElement}
                            value={props.value} onChange={props.changed}>
                       
                            {props.elementConfig.options.map(formElement => (
                                 <option value={formElement.value}>
                                    {formElement.displayValue}
                                </option>
                            ))}
                        
                     </select>;
            break;
        default :
            inputEl = <input className={classes.InputElement}
            {...props.elementConfig}
            value={props.value} 
            onChange={props.changed}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
       
    )
}

export default input