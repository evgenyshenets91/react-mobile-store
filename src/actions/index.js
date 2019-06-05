import {
  FETCH_PHONES_START,
  FETCH_PHONES_SUCCESS,
  FETCH_PHONES_FAILURE,
  LOAD_MORE_PHONES_START,
  LOAD_MORE_PHONES_SUCCESS,
  LOAD_MORE_PHONES_FAILURE,
  FETCH_PHONE_BY_ID_START,
  FETCH_PHONE_BY_ID_SUCCESS,
  FETCH_PHONE_BY_ID_FAILURE,
  ADD_PHONE_TO_BACKET
} from '../constants';

import {fetchPhones as fetchPhonesApi} from '../api/'
import {loadMorePhonesApi, loadFetchPhoneIdApi} from '../api/';
import {getRenderedPhonesLength} from '../helpers/';

// т.к подключили thunk, можем писать асинхронные экшэны, без использования then
export const fetchPhones = () => async (dispatch) => {
  dispatch({
    type: FETCH_PHONES_START,
  })
    try {
      const phones = await fetchPhonesApi();
      dispatch({
        type: FETCH_PHONES_SUCCESS,
        payload: phones,
        // generateId: true
      })
    } catch (err) {
        dispatch ({
        type: FETCH_PHONES_FAILURE,
        payload: {err},
        error: true
      })
    }

}
export const onLoadMorePhones = () => async (dispatch, getState) => {
  const offset = getRenderedPhonesLength(getState())
  dispatch({
    type: LOAD_MORE_PHONES_START,
  })
    try {
      const phones = await loadMorePhonesApi({offset});
      dispatch({
        type: LOAD_MORE_PHONES_SUCCESS,
        payload: phones
      })
    } catch (err) {
        dispatch ({
        type: LOAD_MORE_PHONES_FAILURE,
        payload: {err},
        error: true
      })
    }

}

export const fetchPhonesById = (id) => async dispatch => {

  dispatch({
    type: FETCH_PHONE_BY_ID_START
  })

  try {
    const phone = await loadFetchPhoneIdApi(id);
    dispatch({
      type: FETCH_PHONE_BY_ID_SUCCESS,
      payload: phone
    })
  } catch (err) {
    dispatch({
      type: FETCH_PHONE_BY_ID_FAILURE,
      payload: {err},
      error: true
    })
  }
}

export const onAddToBacket = id => dispatch => {
  dispatch({
    type: ADD_PHONE_TO_BACKET,
    payload: id
  })
}