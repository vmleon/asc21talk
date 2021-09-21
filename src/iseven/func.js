const fdk = require('@fnproject/fdk');
const logger = require('pino')();
const { isEvenNumber, isValidNumber } = require('./utils.js');

fdk.handle(function (input, ctx) {
  const number = getNumber(input, ctx);
  if (!number) {
    logger.error('No number provided');
    return { error: true, msg: 'No number provided' };
  }
  if (!isValidNumber(number)) {
    logger.error(`Number ${number} is not a number`);
    return { error: true, number, msg: 'Not a number' };
  }
  const isEven = isEvenNumber(number);
  return { number, isEven };
});

function getNumber(input, ctx) {
  if (input && input.number) {
    return parseInt(input.number);
  }
  const requestURL = ctx.headers['Fn-Http-Request-Url'].toString();
  logger.info(`Request URL ${requestURL}`);
  if (requestURL) {
    const number = parseInt(requestURL.split('iseven/')[1]);
    logger.info(`Number ${number}`);
    return number;
  }
  return;
}
