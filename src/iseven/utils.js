const isEvenNumber = (number) => Math.abs(number) % 2 == 0;

const isNumber = (number) => {
  return typeof number == 'number';
};

module.exports = { isEvenNumber, isNumber };
