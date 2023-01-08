const yup = require('yup');
const Entity = require('../Entity');

const bankScheme = yup.object().shape({
  cardNumber: yup.string().trim().required().primaryKey(),
  name: yup.string().trim().required(),
  expiry: yup.string().trim().required(),
  cvc: yup.string().trim().required(),
  balance: yup.number().default(0).min(0).required(),
});

module.exports = (db) =>
  new Entity({
    client: db.client,
    modelName: 'Bank',
    tableName: 'Banks',
    yupScheme: bankScheme,
  }, db);
