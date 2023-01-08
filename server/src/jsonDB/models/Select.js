const yup = require('yup');
const Entity = require('../Entity');

const selectScheme = yup.object().shape({
  type: yup.string().required().primaryKey(),
  describe: yup.string().required().primaryKey(),
});

module.exports = (db) =>
  new Entity({
    client: db.client,
    modelName: 'Select',
    tableName: 'Selects',
    yupScheme: selectScheme,
  }, db);
