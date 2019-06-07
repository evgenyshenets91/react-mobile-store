import React from 'react';
import BasketCart from '../basketCart';
import Categories from '../categories';

const Sidebar = ({catId}) => {
  return (
    <div>
    <Categories id={catId} />
    <BasketCart />
  </div>
  )
}



 export default Sidebar