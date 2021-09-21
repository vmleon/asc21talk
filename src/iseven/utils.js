const isEvenNumber = (number) => Math.abs(number) % 2 == 0;

const isValidNumber = (number) => {
  return Number.isInteger(number);
};

module.exports = { isEvenNumber, isValidNumber };
