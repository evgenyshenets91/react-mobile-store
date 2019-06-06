import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPhonesById, onAddToBacket} from '../../actions';
import {getPhoneId} from '../../helpers';
import * as R from 'ramda';
import Sidebar from '../../components/sidebar';
import {Link} from 'react-router-dom';
import Loader from '../../components/loader';


class Phone extends Component {
  static propTypes = {

  }
  componentDidMount(){
    const {params} = this.props.match;
    this.props.fetchPhonesById(params.id);
  }

  renderFields(){
    const {phone} = this.props;
    // из объекта достаём нужные поля и преобразуем в массив типа [[key: value], [--//--]]
    const columnFields = R.compose(
      R.toPairs,
      R.pick(['cpu', 
      'camera', 
      'battery', 
      'display',
      'size',
      'weight',
      'memory'
    ])
    )(phone);
    
    return columnFields.map(([key, value]) => (
      <div className='column' key={key}>
        <div className='ab-details-title'>
          <p>{key}</p>
        </div>
        <div className='ab-details-info'>
          <p>{value}</p>
        </div>
      </div>
    ))
  }

  renderPhone = () => {
    const {phone} = this.props;
    return (
      <div className='thumbnail'>
        <div className='row'>
          <div className='col-md-6'>
            <img className='img-thumbnail'
                 src={phone.image}
                 alt={phone.name}
            />
          </div>
          <div className='col-md-6'>
            {this.renderFields()}
          </div>
        </div>
        <div className='caption-full'>
            <h4 className='pull-right'>
              ${phone.price}
            </h4>
            <h4>{phone.name}</h4>
            <p>{phone.description}</p>

        </div>
      </div>
    )
  }

  render() {
    const {phone, onAddToBacket} = this.props;
    if (!phone) return null;
    return (

      <section className='view-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-9'>
            {this.renderPhone()}
            </div>
            <div className='col-md-3'>
              <div>
                <p className='lead'>Quick shop</p>
                <Sidebar />
                <div className='form-group'>
                  <h2>{phone.name}</h2>
                  <h3>${phone.price}</h3>
                  <Link to='/' 
                        className='btn btn-info btn-block'
                  >
                    Back to store
                  </Link>
                  <button type='button'
                          className='btn btn-success btn-block'
                          onClick={() => onAddToBacket(phone.id)}
                  >
                    By phone!
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    )
  }
}
  const mapStateToProps = (state) => {
    // пройдётся по state и вернёт элемент с id
    return {
      phone: getPhoneId(state, state.phonePage.id)
    }
  }

  export default connect(mapStateToProps, {fetchPhonesById, onAddToBacket})(Phone);