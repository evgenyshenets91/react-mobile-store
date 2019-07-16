import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {fetchPhones, onLoadMorePhones, onAddToBacket, fetchCategories} from '../../actions/';
import {getPhones} from '../../helpers';
import { Link, withRouter } from "react-router-dom";
import Loader from '../../components/loader';
import {compose} from 'redux'
import {HocLoader} from '../../withData';

class Phones extends Component {
  static propTypes = {

  }
  componentDidMount(){
    this.props.fetchPhones();
    this.props.fetchCategories();
  }


  renderPhones = () => {
    const {phones, onAddToBacket} = this.props;
    if (phones.length === 0) return <h2>Search no results</h2>
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
    console.log(this)
    const {onLoadMorePhones, loading} = this.props;
    // if (loading) return <Loader />
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

const mapStateToProps = (state, ownProps) => {
  // ownProps через withRouter прокидывает сюда history.
  return {
    phones: getPhones(state, ownProps),
    // loading : state.phones.loading
  }
}

const mapDispatchToProps = {
  fetchPhones, 
  onLoadMorePhones, 
  onAddToBacket,
  fetchCategories
}

// export default HocLoader(connect(mapStateToProps, mapDispatchToProps)(Phones));

export default HocLoader('http://i.imgur.com/QxsxVEc.gif')(compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
  )(Phones));