import React, { Component } from 'react';


export default (Wrapped) => class withData extends Component {


  render(){
    return (
      <Wrapped {...this.props}/>
    )
  }
}

