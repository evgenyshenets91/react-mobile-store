import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {fetchPhones, onLoadMorePhones} from '../../actions/';
import {getPhones} from '../../helpers';
import { NavLink } from "react-router-dom";

class Phones extends Component {
  static propTypes = {

  }
  componentDidMount(){
    this.props.fetchPhones()
  }

  renderPhones = () => {
    const {phones} = this.props;
    const items = phones.map(phone => {
      const shortDescription = `${R.take(60, phone.description)}...`
      const {id, name, price, image} = phone;
      return (
        <li className='col-sm-4 col-lg-4 col-md-4 book-list' 
            key={id}
            ref={li => this.li = li}
        >
          <div className='thumbnail'>
            <img className='img-thumbnail' src={image} alt={name} />
            <div className='caption'>
              <div className='caption-title'>
                <h4>${price}</h4>
                <h4 className=''>
                  <NavLink to={`/phones/${id}`}>{name}</NavLink>
                </h4>
              </div>
              <p>{shortDescription}</p>
              <p className='item-button'>
              <button
                className='btn btn-primary'
              >
                Buy Now!
              </button>
              <NavLink
                to={`/phones/${phone.id}`}
                className='btn btn-default'
              >
                More info
              </NavLink>
            </p>
            </div>
          </div>
        </li>
    )
    })

    return <ul className='books row'>{items}</ul>

  }

  render() {
    const {onLoadMorePhones} = this.props;
    return (
      <div>
        {this.renderPhones()}
        <div className='wrapper-button row'>
          <button className='btn btn-danger pull-right'
                  onClick={onLoadMorePhones}
          >
            Load More
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    phones: getPhones(state)
  }
}

export default connect(mapStateToProps, {fetchPhones, onLoadMorePhones})(Phones);
