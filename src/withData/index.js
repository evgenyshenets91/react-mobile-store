import React from 'react';
import Loader from '../components/loader/';
import { connect } from 'react-redux'


export const HocLoader = Wrapped => connect(mapStateToProps, null)(class extends React.PureComponent {
  render(){
    return (
      // this.props.loading ? <Loader /> : <Wrapped {...this.props}/>
      <Wrapped {...this.props}/>

    )
  }
});


const mapStateToProps = state => {
  return {
    loading : state.phones.loading
  } 
}