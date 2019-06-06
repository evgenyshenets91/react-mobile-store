import {
  FETCH_PHONES_START,
  FETCH_PHONES_SUCCESS,
  FETCH_PHONES_FAILURE,
  LOAD_MORE_PHONES_SUCCESS,
  FETCH_PHONE_BY_ID_SUCCESS
} from '../constants';
import * as R from 'ramda';

const initialState = {
  loading: false
}


export default (state = initialState, action) => {
  const {payload, type, randomId} = action;
  switch (type) {

    case FETCH_PHONES_START:
      const update = R.lensProp('loading')
      return R.set(update, true, state)

    case FETCH_PHONES_SUCCESS:
      const newValues = R.indexBy(R.prop('id'), payload)
      const newValueLoad = R.set(R.lensProp('loading'), false, state)
      return R.merge(R.merge(state, newValueLoad), newValues, newValueLoad)

    case LOAD_MORE_PHONES_SUCCESS:
    const loadValues = R.indexBy(R.prop('id'), payload)
    return R.merge(state, loadValues);

    case FETCH_PHONE_BY_ID_SUCCESS:
      return R.assoc(payload.id, payload, state)
  
  }
  return state

}

