const isValidNumber = (number) => {
  return Number.isInteger(number);
};

function getPrimeFactors(n) {
  let factors = [],
    divisor = 2;

  while (n > 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

module.exports = { isValidNumber, getPrimeFactors };
