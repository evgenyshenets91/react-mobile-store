import * as R from 'ramda';
import {
  ADD_PHONE_TO_BACKET
} from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_PHONE_TO_BACKET:
      return R.append(payload, state)
      

  }
  return state;
}