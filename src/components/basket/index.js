import React from 'react'
import { connect } from 'react-redux'
import phones from '../../containers/phones';


const Basket = () => {
  return (
    <div>
      Basket
    </div>
  )
}

const mapStateToProps = (state) => {
  phones: 
  totalBasketPrice: getTotalBasketPrice(state)
}

export default connect(mapStateToProps, null)(Basket)
