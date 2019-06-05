import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPhonesById} from '../../actions';
import {getPhoneId} from '../../helpers';
import * as R from 'ramda';


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
      <React.Fragment>
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
      </React.Fragment>
    )
  }

  render() {
    if (!this.props.phone) return null;
    console.log(this.props.phone)
    return (
      <section className='thumbnail'>
      {this.renderPhone()}
      </section>
    )
  }
}
  const mapStateToProps = (state) => {
    console.log(state.phonePage.id)
    // пройдётся по state и вернёт элемент с id
    return {
      phone: getPhoneId(state, state.phonePage.id)
    }
  }

  export default connect(mapStateToProps, {fetchPhonesById})(Phone);