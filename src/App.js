import React, {Component} from "react";
import history from './history';
import {ConnectedRouter} from 'connected-react-router';
import {Route} from 'react-router-dom';

import Layout from "./containers/layout";
import Phones from "./containers/phones";

import './main.css';

class App extends Component {
  render(){
    return(
      <ConnectedRouter history={history}>
        {/* <Route component={Layout}> */}
        <Layout>          
          <Route path='/' component={Phones} />
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default App;