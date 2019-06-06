import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {fetchPhones, onLoadMorePhones, onAddToBacket} from '../../actions/';
import {getPhones} from '../../helpers';
import { Link, withRouter } from "react-router-dom";
import Loader from '../../components/loader';

class Phones extends Component {
  static propTypes = {

  }
  componentDidMount(){
    this.props.fetchPhones()
  }

  renderPhones = () => {
    const {phones, onAddToBacket} = this.props;
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
                  <Link to={`/phones/${id}`}>{name}</Link>
                </h4>
              </div>
              <p>{shortDescription}</p>
              <p className='item-button'>
              <button
                className='btn btn-primary'
                onClick={() => onAddToBacket(id)}
              >
                Buy Now!
              </button>
              <Link
                to={`/phones/${id}`}
                className='btn btn-default'
              >
                More info
              </Link>
            </p>
            </div>
          </div>
        </li>
    )
    })

    return <ul className='books row'>{items}</ul>

  }

  render() {
    const {onLoadMorePhones, loading} = this.props;
    if (loading) return <Loader />
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
    phones: getPhones(state),
    loading : state.phones.loading
  }
}

const mapDispatchToProps = {
  fetchPhones, 
  onLoadMorePhones, 
  onAddToBacket
}

export default connect(mapStateToProps, mapDispatchToProps)(Phones);
