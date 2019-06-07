import React from 'react';
import { connect } from 'react-redux'
import {getCategories, getActiveCategoryId} from '../../helpers';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import * as R from 'ramda';



const Categories = ({categories, activeCategoryId}) => {
  console.log(activeCategoryId)

  const renderCategories = (category, idx) => {

    const linkClass = classNames({
      'list-group-item': true,
      'active': category.id === activeCategoryId
    })
    return(
      <Link to={`/categories/${category.id}/`}
            key={idx} className={linkClass}
      >
      {category.name}
      </Link>
    )
  }

  const renderAllPhones = () => {
    const linkClass = classNames({
      'list-group-item': true,
      active: R.isNil(activeCategoryId)  //activeCategoryId === undefined
    })
    return(
      <Link to='/'
            className={linkClass}
      >
      All Brands
      </Link>
    )
  }

  return (
    <div className='well'>
      <h4>Brand</h4>
        <div>{renderAllPhones()}</div>
        <div className='list-group'>
          {categories.map((elem, index) => renderCategories(elem, index))}
        </div>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  // ownProps, т.е. получаем через роутер, правда прокинуть приходится через пару компонентов
  return {
    categories: getCategories(state),
    activeCategoryId: getActiveCategoryId(ownProps)
  }

}

export default connect(mapStateToProps, null)(Categories)
// export default compose(
//   withRouter,
//   connect(mapStateToProps, null)
// )(Categories)
