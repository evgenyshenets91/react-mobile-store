import {
  FETCH_PHONES_START,
  FETCH_PHONES_SUCCESS,
  FETCH_PHONES_FAILURE,
  LOAD_MORE_PHONES_SUCCESS
} from '../constants';
import * as R from 'ramda';

const initialState = {}


export default (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {

    case FETCH_PHONES_SUCCESS:
      const newValues = R.indexBy(R.prop('id'), payload)
      return R.merge(state, newValues);


    case LOAD_MORE_PHONES_SUCCESS:
    const loadValues = R.indexBy(R.prop('id'), payload)
    return R.merge(state, loadValues);
  
  }
  return state

}

