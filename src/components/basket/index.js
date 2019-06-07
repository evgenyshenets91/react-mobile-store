import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getTotalBasketPrice, getBasketPhonesCount} from '../../helpers';
import * as R from 'ramda';
import phone from '../../containers/phone';

const HEADTABLE = [
  'Image', 'Name', 'Price', 'Count', ''
]

const Basket = ({phones, totalBasketPrice}) => {
  console.log(phones)
  const isBasketEmpty = R.isEmpty(phones); // true если нету товаров в корзине

  const renderSidebar = () => {
    return (
      <div>
        Sidebar
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div>
        {isBasketEmpty && <h3>Your shopping cart is empty</h3>}

        <div className='table-responsive'>
          <table className='table-bordered table-striped table-condensed cf'>
          <thead>
          <tr>
            { !isBasketEmpty && HEADTABLE.map((el, i) => (
              <td key={i}
                  className='table-head'
              >
                {el}
              </td>
            ))}
            </tr>

          </thead>
            <tbody>
            {phones.map((phone, index) => (
              <tr
                key={index}
                className='item-checout'
              >
                <td className='first-column-checkout'>
                  <img
                    className='img-thumbnail'
                    src={phone.image}
                    alt={phone.name}
                  />
                </td>
                <td>{phone.name}</td>
                <td>${phone.price}</td>
                <td>{phone.count}</td>
                <td>
                    <span
                      className='delete-cart'
                    />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        {
          R.not(isBasketEmpty) &&
          <div className='row'>
            <div className='pull-right total-user-checkout'>
              <b>Total:</b>
              ${totalBasketPrice}
            </div>
          </div>
        }
      </div>
    )
  }
  
  return (
    <div className='view-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>
            {renderContent()}
          </div>
          <div className='col-md-3 btn-user-checkout'>
            {renderSidebar()}
          </div>

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    phones: getBasketPhonesCount(state),
    totalBasketPrice: getTotalBasketPrice(state)
  }
  
}

export default connect(mapStateToProps, null)(Basket)

Basket.propTypes = {
  phones: PropTypes.array,
  totalBasketPrice: PropTypes.number
}

