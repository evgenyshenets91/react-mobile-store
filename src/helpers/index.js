import * as R from 'ramda';

export const arrToMap = (arr) => {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc
  }, {})
}

// функция принимает Id и выводит отдельный телефон
const getPhoneId = (state, id) => R.prop(id, state.phones)

// пробегает по каждому элементу из state.phonesPage.ids и возвращает Телефон по такому id
export const getPhones = state => {
  const phones = R.map(el => getPhoneId(state, el) , state.phonesPage.ids);
  return phones
}


export const getRenderedPhonesLength = (state) => {
  return R.length(state.phonesPage.ids)
}