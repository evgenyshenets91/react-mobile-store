import {
  FETCH_PHONES_SUCCESS, LOAD_MORE_PHONES_SUCCESS
} from '../constants';

import * as R from 'ramda';

const initialState = {
  ids: []
}


export default (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {

    case FETCH_PHONES_SUCCESS:
      const newState = R.pluck('id', payload);
      return R.merge(state, {
        ids: newState
      } )

    case LOAD_MORE_PHONES_SUCCESS:
      const id = R.pluck('id', payload);
      return R.merge(state, {
        ids: R.concat(state.ids, id)

      })

  
  }
  return state

}

