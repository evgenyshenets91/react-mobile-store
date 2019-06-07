import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {searchPhone} from '../../actions'

class Search extends Component {
  static propTypes = {
    value: PropTypes.string
  }

  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.searchPhone(this.state.value)

  }

  render() {
    return (
      <div className='well blosd'>
        <h3 className='lead' style={{textAlign: 'center'}}>
          Quick search
        </h3>
        <div className='input-group'>
          <form onSubmit={this.handleSubmit}>
            <input type='text'
                   onChange={this.handleChange}
                   className='form-control'
            />
          </form>
          <span className='input-group-btn'>
            <button className='btn btn-default'
                    type='submit'
            >
              <span className='glyphicon glyphicon-search' />
            </button>
          </span>

        </div>
      </div>
    )
  }
}

export default connect(null, {searchPhone})(Search)