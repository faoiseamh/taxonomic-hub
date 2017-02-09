export function arrayToObjectKeyedById(array) {
  return array.reduce((items, item) => {
    items[item.id] = item; // eslint-disable-line no-param-reassign
    return items;
  }, {});
}
