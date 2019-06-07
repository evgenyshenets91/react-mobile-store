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
  ADD_PHONE_TO_BACKET,
  SEARCH_PHONE,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET,
  CHECKOUT_PHONES
} from '../constants';

import {fetchPhones as fetchPhonesApi} from '../api/'
import {loadMorePhonesApi, loadFetchPhoneIdApi, fetchCategoriesApi} from '../api/';
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
      })
    } catch (err) {
        dispatch ({
        type: FETCH_PHONES_FAILURE,
        payload: {err},
        error: true
      })
    }

}

export const fetchCategories = () => async (dispatch) => {
  dispatch({
    type: FETCH_CATEGORIES_START,
  })
    try {
      const categories = await fetchCategoriesApi();
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories,
      })
    } catch (err) {
        dispatch ({
        type: FETCH_CATEGORIES_FAILURE,
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

export const searchPhone = (value) => dispatch => {
  dispatch({
    type: SEARCH_PHONE,
    payload: value
  })
}

export const removePhoneFromBasket = (id) => ({
    type: REMOVE_PHONE_FROM_BASKET,
    payload: id
})

export const clearBasket = () => ({
  type: CLEAN_BASKET,

})

export const backetCheckout = (phones) => {
  return  alert(JSON.stringify(phones))
}