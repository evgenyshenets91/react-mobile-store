import * as R from 'ramda';
import {
  ADD_PHONE_TO_BACKET,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET,
  INCREMENT_COUNT_PHONES,
  DECREMENT_COUNT_PHONES

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
      return R.empty(state);

    case INCREMENT_COUNT_PHONES: 
      return R.append(payload, state);

    case DECREMENT_COUNT_PHONES: 
      const elem = state.findIndex(el => el === payload);
      const before = state.slice(0, elem)
      const after = state.slice(elem + 1)
      return [...before, ...after]


  }
  return state;
}