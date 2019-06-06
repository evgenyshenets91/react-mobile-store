import * as R from 'ramda';

export const arrToMap = (arr) => {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc
  }, {})
}

// функция принимает Id и выводит отдельный телефон
export const getPhoneId = (state, id) => R.prop(id, state.phones)

// пробегает по каждому элементу из state.phonesPage.ids и возвращает Телефон по такому id
export const getPhones = state => {
  const searchString = (item) => {
    // cмотрим совпадения в элементе по ключу 'name' по search
    return R.includes(state.phonesPage.search, R.prop('name', item))
  } 
  const filteredPhones =  R.compose(
    // пробежим по массиву функцией, которая будет искать совпадения по имени
    R.filter(searchString),
    R.map(el => getPhoneId(state, el))
  )(state.phonesPage.ids)
  return filteredPhones;
  
  // const phones = R.map(el => getPhoneId(state, el) , state.phonesPage.ids);
  // return phones
}


export const getRenderedPhonesLength = (state) => {
  return R.length(state.phonesPage.ids)
}

export const  getTotalBasketPrice = state => {
  const totalPrice = R.compose(
    R.sum,  // метод суммирующий все элементы массива, т.е цены
    R.pluck('price'),  // ранее был у нас массив объектов, а теперь останется только строка с ценой
    R.map(id => getPhoneId(state, id)) // проходим по массиву наших id и возвращаем через функцию соответствующие Элементы(телефоны)
  )(state.basket)

  return totalPrice
}

export const  getTotalBasketCount = state => R.length(state.basket)