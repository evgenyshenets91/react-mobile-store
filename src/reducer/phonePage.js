import * as R from 'ramda';

import {
  FETCH_PHONE_BY_ID_SUCCESS
} from '../constants';

const initialState = {
  id: null
}

export default (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case FETCH_PHONE_BY_ID_SUCCESS:
      return R.merge(state, {
        id: R.prop('id', payload)
      })
      
  
  }
  return state
} 