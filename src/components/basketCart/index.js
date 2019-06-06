import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getTotalBasketCount, getTotalBasketPrice} from '../../helpers'

const BasketCart = ({totalBasketCount, totalBasketPrice}) => (
  <div className='cart'>
    <div className='dropdown'>
      <Link to='/basket'
            className='btn btn-inverse btn-block btn-lg'
      >
      <i className='fa fa-fa-shopping-cart' />
      <span>{totalBasketCount} item(s) - ${totalBasketPrice}</span>
      </Link>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  totalBasketCount: getTotalBasketCount(state),
  totalBasketPrice: getTotalBasketPrice(state),
})

 export default connect(mapStateToProps, null)(BasketCart);