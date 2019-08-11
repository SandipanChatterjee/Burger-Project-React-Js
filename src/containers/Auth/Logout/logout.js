import React, { Component } from 'react'
import * as action from '../../../Store/actions/index'
import  {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class logout extends Component {
    componentDidMount(){
        this.props.onLogout()
    }
    render() {
        return (
            <Redirect path="/"/>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        onLogout : () => (dispatch(action.authLogOut()))
    }
} 

export default connect(null,mapDispatchToProps)(logout)