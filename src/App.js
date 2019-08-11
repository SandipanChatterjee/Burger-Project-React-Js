import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch,withRouter} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import authContainer from './containers/Auth/Auth'
import logout from './containers/Auth/Logout/logout'
import * as action from './Store/actions/index'
import {connect} from 'react-redux'
class App extends Component {
  componentDidMount(){
    this.props.onAutoTrySignIn()
  }
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={authContainer} />
            <Route path="/logout" component={logout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    onAutoTrySignIn : () => {dispatch(action.authCheckState())}
  }
}
export default withRouter(connect(null,mapDispatchToProps)(App));
