/**
 * Перемешивает массив
*/
const shuffleArray = (array, quantity = 3) => {
  const sort = () => Math.random() - 0.5;

  const shuffle = (index) => {
    if (index === quantity) return array;
    array.sort(sort);
    return shuffle(index + 1);
  };

  return shuffle(0);
};

/**
 * Ищет дубликаты в массиве
 */
const searchDuplicateItem = (array, propName, value) => {
  let duplicate = false;
  array.forEach((item) => {
    if (item[propName] === value) {
      duplicate = true;
    }
  });

  return duplicate;
};

export {
  shuffleArray,
  searchDuplicateItem,
};
