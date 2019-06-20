import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getTotalBasketPrice, getBasketPhonesCount} from '../../helpers';
import * as R from 'ramda';
import {removePhoneFromBasket, backetCheckout, clearBasket, increment, decrement} from '../../actions';
import { Link } from "react-router-dom";
import TableBody from './tableBody';


const HEADTABLE = [
  {
    name: 'image',
    sortable: false,
  },
  {
    name: 'name',
    sortable: true,
  },
  {
    name: 'price',
    sortable: true
  },
  {
    name: 'count',
    sortable: true
  },
  {
    name: '',
    sortable: false
  }
]

class Basket extends Component{

  static propTypes = {
    phones: PropTypes.array,
    totalBasketPrice: PropTypes.number
  }

  state = {
    phones: this.props.phones,

    sort: {
      sorted: null,
      by: null,
      direction: null,
      columnNow: null
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.phones !== nextProps.phones) {
      this.setState({
        phones: nextProps.phones
      })
    }
  }

  checkDirection = (arr, column) => {
    const direct = arr[0][column.name] > arr[arr.length - 1][column.name] ? 'desc' : 'asc';
    return direct
  }

  typeSort = (arr, column) => {
    return typeof arr[0][column.name]
  }

  toggleSort = (column) => {
    const typeOfColumn = this.typeSort(this.state.phones, column);

    const sortDesc = (a, b) => {
      if(a[column.name] < b[column.name]) return -1;
      return 1;
    }
    const fnNum = (a, b) => { // в порядке убывания
      return  b[column.name] - a[column.name]
    };

    switch (typeOfColumn) {
      case 'number':
        this.sortAllTypes(column, fnNum)
        break;

      case 'string':
        this.sortAllTypes(column, sortDesc)
        break;
    }

  }

  sortAllTypes = (column, sortFn) => {
    const {phones, sort: {by, sorted, columnNow}} = this.state;
    const phonesSort = phones.sort(sortFn);

    if(by !== column.name){
      this.setState(state => ({
        phones: phonesSort,
        sort: {
          ...state.sort,
          by: column.name,
          columnNow: column.name,
          sorted: true
        }
      }))
    } else if(by === column.name) {
      this.setState(state => ({
        phones: phonesSort.reverse(),
        sort: {
          ...state.sort,
          by: null,
          sorted: !sorted
        }
      }))
    }
  }
  

  sortableToggle = (column) => (
    column.sortable ? this.toggleSort(column) : undefined
  )

  renderArrowSort = (el) => {
    if(el.name === this.state.sort.columnNow){
      const arrowSort = this.state.sort.sorted ? 
      <span className='glyphicon arrow glyphicon-triangle-bottom' /> : 
      <span className='glyphicon arrow glyphicon-triangle-top' /> 
      return  arrowSort
    }
  }

  renderContent = () => {
    
    const { phones,
            totalBasketPrice, 
            removePhoneFromBasket, 
            increment, 
            decrement} = this.props;
    const isBasketEmpty = R.isEmpty(phones);  
 
    return (
      <div>
        {isBasketEmpty && <h3>Your shopping cart is empty</h3>}

        <div className='table-responsive'>
          <table className='table-bordered table-striped table-condensed cf'>
          <thead>
          <tr>
            { R.not(isBasketEmpty) && HEADTABLE.map((el, i) => (
              <td key={i}
                  className='table-head'
                  onClick={() => this.sortableToggle(el)}
              > 
                {this.renderArrowSort(el)}
                {el.name}
              </td>
            ))}
            </tr>

          </thead>
              <TableBody phones={phones} 
                         removePhoneFromBasket={removePhoneFromBasket}
                         increment={increment}
                         decrement={decrement}
              />
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

  renderSidebar = () => {
    const {clearBasket, phones} = this.props;
    const isBasketEmpty = R.isEmpty(phones);
    return (
      <div>
        <Link to='/'
              className='btn btn-info'
        >
        <span className='glyphicon glyphicon-info-sign' />
        <span>Continue Shopping</span>
        </Link>
        { R.not(isBasketEmpty) && 
          <div>
            <button className='btn btn-warning'
                    onClick={clearBasket}
            >
            <span className='glyphicon glyphicon-trash' />
            Clear cart
            </button>
            <button className='btn btn-success'
                    onClick={() => backetCheckout(phones)}
            >
            <span className='glyphicon glyphicon-envelope' />
            Checkout
            </button>
          </div> }
      </div>
    )
  }

  render(){
    console.log(this.state.sort.columnNow)

    return (
      <div className='view-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-9'>
              {this.renderContent()}
            </div>
            <div className='col-md-3 btn-user-checkout'>
              {this.renderSidebar()}
            </div>

          </div>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    phones: getBasketPhonesCount(state),
    totalBasketPrice: getTotalBasketPrice(state)
  }
  
}

export default connect(mapStateToProps, {removePhoneFromBasket, 
                                         backetCheckout, 
                                         clearBasket, 
                                         increment, 
                                         decrement})(Basket)



