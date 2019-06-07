import * as R from 'ramda';
import {FETCH_CATEGORIES_SUCCESS} from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case FETCH_CATEGORIES_SUCCESS:
      const newValues = R.indexBy(R.prop('id'), payload)
    return R.merge(state, newValues)
  }
  return state
}