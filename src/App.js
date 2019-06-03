import React, {Component} from "react";
import history from './history';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from 'react-router';

import Layout from "./containers/layout";
import Phones from "./containers/phones";

class App extends Component {
  render(){
    return(
      <ConnectedRouter history={history}>
        <Switch>
          {/* <Route path='/' component={Layout} /> */}
          <Route path='/' component={Phones} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

export default App;