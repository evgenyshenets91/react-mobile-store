import React from 'react';
import { Link } from "react-router-dom";

const TableBody = ({phones, removePhoneFromBasket, increment,decrement}) => {

  return (
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
        <td>
          <Link to={`/phones/${phone.id}`}>
            {phone.name}
          </Link>
        </td>
        <td>${phone.price}</td>
        <td>
          <span className='glyphicon glyphicon-minus-sign decrement'
                onClick={() => decrement(phone.id)}    
          />
          {phone.count}
          <span className='glyphicon glyphicon-plus-sign increment' 
                onClick={() => increment(phone.id)}
          />
        </td>
        <td>
            <span onClick={() => removePhoneFromBasket(phone.id)}
                  className='delete-cart'
            />
        </td>
      </tr>
    ))}
    </tbody>
  )
}

export default TableBody
