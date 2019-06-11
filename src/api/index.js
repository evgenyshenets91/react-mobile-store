import phones from './mockPhones';
import categories  from './mockCategories';
import * as R from 'ramda';
// import request from 'superagent'

// export const fetchPhones = async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve(phones)
//     }, 1000);
//     // reject('Error')
//   })
// }

export const fetchPhones = async () => {

  // через superagent
  // const body = await request.get('http://www.mocky.io/v2/5918b9461200001f1040dbeb')
  // console.log('body', body)
  // return body.phones

  const response = await fetch('http://www.mocky.io/v2/5cfe195e3200002c0045ee65');
  const data = await response.json();
  return data.phones.slice(0, 3)
}

export const loadMorePhonesApi = async (offset) => {
  // return new Promise((resolve, reject) => {
  //   resolve(phones)
  //   reject('Error')
  // })
  const response = await fetch('http://www.mocky.io/v2/5cfe195e3200002c0045ee65');
  const data  = await response.json();
  return data.phones.slice(offset, offset + 3)
}

export const loadFetchPhoneIdApi = async (id) => {
  // return new Promise((resolve, reject) => {
  //   // const phone = R.find(R.propEq('id', id), phones )
  //   const phone = phones.find(el => el.id === id)
  //   resolve(phone)
  // })
  const response = await fetch('http://www.mocky.io/v2/5cfe195e3200002c0045ee65');
  const data  = await response.json();
  const {phones} = data;
  return phones.find(el => el.id === id)
}

export const fetchCategoriesApi = async () => {
  // return new Promise((resolve, reject) => {
  //   return (resolve(categories))
  // })
  const response = await fetch('http://www.mocky.io/v2/5cfe0a20320000640045ede2');
  const body = await response.json();
  return body.categories
}