import phones from './mockPhones'

export const fetchPhones = async () => {
  return new Promise((resolve, reject) => {
    resolve(phones)
    // reject('Error')
  })
}

export const loadMorePhonesApi = async ({offset}) => {
  return new Promise((resolve, reject) => {
    resolve(phones)
    // reject('Error')
  })
}