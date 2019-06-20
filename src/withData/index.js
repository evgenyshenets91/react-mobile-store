import React, {Fragment} from 'react';
import Loader from '../components/loader/';
import { connect } from 'react-redux'


export const HocLoader = (loaderPath) => Wrapped => connect(mapStateToProps, null)(class extends React.PureComponent {

  loadComponent = () => {
    return (
      <div>
        <img src={loaderPath} />
      </div>
    )
  }

  render(){   
    return (
      <Fragment>
        {this.props.loading && this.loadComponent()}
        <Wrapped {...this.props}/>
      </Fragment>
    )
  }
});


const mapStateToProps = state => {
  return {
    loading : state.phones.loading
  } 
}