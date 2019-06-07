import * as R from 'ramda';
import {
  ADD_PHONE_TO_BACKET,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET

} from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_PHONE_TO_BACKET:
      return R.append(payload, state);

    case REMOVE_PHONE_FROM_BASKET:
      return R.without(R.of(payload), state);

    case CLEAN_BASKET:
      return R.empty(state)     

  }
  return state;
}