const fdk = require('@fnproject/fdk');
const { isEvenNumber, isNumber } = require('./utils.js');

fdk.handle(function (input, ctx) {
  let pathUrl = ctx.httpGateway.requestURL;
  let number = parseInt(pathUrl.split('number/')[1]);
  if (!isNumber(number)) {
    return { error: true, number, msg: 'Not a Number' };
  }
  const isEven = isEvenNumber(number);
  return { number, isEven };
});
