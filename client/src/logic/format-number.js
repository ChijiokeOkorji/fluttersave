function formatNumber(input) {
  let number = Number(input).toFixed(2);

  let floatingSplit = String(number).split('.');

  let integerValueArray = floatingSplit[0].split('');
  let integerFormatted = integerValueArray.map((item, index, array) => {
    let reverseIndex = array.length - 1 - index;

    if (reverseIndex !== 0 && !(reverseIndex % 3)) {
      return `${item},`;// add a comma
    }

    return item;
  });

  floatingSplit[0] = integerFormatted.join('');

  return floatingSplit.join('.');
}

export { formatNumber };