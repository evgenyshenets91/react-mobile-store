import React, {Component} from "react";
import history from './history';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Layout from "./containers/layout";
import Phones from "./containers/phones";
import Phone from "./containers/phone";

import './main.css';


class App extends Component {
  render(){
    return(
      <ConnectedRouter history={history} >
      <Layout>
        <Route path='/phones/:id' exact  component={Phone} />
        <Route path='/' exact component={Phones} />
      </Layout>
      </ConnectedRouter>
    )
  }
}

export default App;