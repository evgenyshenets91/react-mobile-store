import phones from './mockPhones';
import categories  from './mockCategories';
import * as R from 'ramda';

export const fetchPhones = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(phones)
    }, 1000);
    // reject('Error')
  })
}

export const loadMorePhonesApi = async ({offset}) => {
  return new Promise((resolve, reject) => {
    resolve(phones)
    // reject('Error')
  })
}

export const loadFetchPhoneIdApi = async (id) => {
  return new Promise((resolve, reject) => {
    // const phone = R.find(R.propEq('id', id), phones )
    const phone = phones.find(el => el.id === id)
    resolve(phone)
  })
}

export const fetchCategoriesApi = async () => {
  return new Promise((resolve, reject) => {
    return (resolve(categories))
  })
}