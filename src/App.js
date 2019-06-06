import React, {Component} from "react";
import history from './history';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Layout from "./containers/layout";
import Phones from "./containers/phones";
import Phone from "./containers/phone";

import './main.css';
import Sidebar from "./components/sidebar";


class App extends Component {
  render(){
    return(
      <ConnectedRouter history={history} >
        <Switch>
        <Route path='/phones/:id' exact  component={Phone} />

        <Layout />
        </Switch>
 
      </ConnectedRouter>
    )
  }
}

export default App;