import * as R from 'ramda';

// функция принимает Id и выводит отдельный телефон
export const getPhoneId = (state, id) => R.prop(id, state.phones)


export const getActiveCategId = id => R.path(['match', 'params', 'id'], id)

// пробегает по каждому элементу из state.phonesPage.ids и возвращает Телефон по такому id
export const getPhones = (state, ownProps) => {
  const activeCategory = getActiveCategId(ownProps);
  const applySearch = (item) => {
    // cмотрим совпадения в элементе по ключу 'name' по search
    return R.includes(state.phonesPage.search.toLowerCase(), R.toLower(R.prop('name', item)))
  } 

  const applyCategory = (item) => (R.equals(activeCategory, R.prop('categoryId', item)));
  const filteredPhones =  R.compose(
    // пробежим по массиву функцией, которая будет искать совпадения по имени
    R.filter(applySearch), // фильтруем по поиску
    R.when(R.always(activeCategory), R.filter(applyCategory)), // проверяем нужно ли нам фильтровать  по категории
    R.map(id => getPhoneId(state, id))   // проходимся по id и возвращаем сами объекты в массив
  )(state.phonesPage.ids);  // есть на вход Id телефонов

  return filteredPhones;
  // const phones = R.map(el => getPhoneId(state, el) , state.phonesPage.ids);
  // return phones
}

export const getCategories = state => {
  //вернёт массив с значениями
  return R.values(state.categories)
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

export const  getTotalBasketCount = state => R.length(state.basket);

export const getActiveCategoryId = id => R.path(['id', 'params', 'id'], id);

export const getBasketPhonesCount = state => {
  const uniqIds = R.uniq(state.basket);
  const phoneCount = (id) => {
    return state.basket.filter(el => el === id).length;
  }

  const phoneWithCount = phone => (R.assoc('count', phoneCount(phone.id), phone));

  const phones = R.compose(
    R.map(phoneWithCount), // будет создаваться поле в массиве объектов С количеством одинаковых элементов
    R.map(id => getPhoneId(state, id))
  )(uniqIds)
  return phones;
}

