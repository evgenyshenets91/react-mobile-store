import React, {Component} from "react";
import history from './history';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch, BrowserRouter, Router} from 'react-router-dom';

import Layout from "./containers/layout";
import Phones from "./containers/phones";
import Phone from "./containers/phone";

import './main.css';
import Sidebar from "./components/sidebar";
import Basket from "./components/basket";


class App extends Component {
  render(){
    return(
      <ConnectedRouter history={history} >

        {/* <BrowserRouter> */}
          <Switch>
            <Route path='/basket' exact component={Basket} />
            <Route path='/categories/:id'  component={Layout} />
            <Route path='/phones/:id' component={Phone} />
            <Route path='/' component={Layout} />
          </Switch>
        {/* </BrowserRouter> */}
      </ConnectedRouter>
    )
  }
}

export default App;