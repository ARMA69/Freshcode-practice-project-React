const yup = require('yup');
const Entity = require('../Entity');

const offerScheme = yup.object().shape({
  id: yup.number().integer().optional().primaryKey().autogenerate('increment'), // pk
  userId: yup.number().integer().min(0).required().foreignKey({ references: { table: 'Users', key: 'id' } }), // fk
  contestId: yup.number().integer().min(0).required().foreignKey({ references: { table: 'Contests', key: 'id' } }), // fk
  text: yup.string().nullable(),
  fileName: yup.string().nullable(),
  originalFileName: yup.string().nullable(),
  status: yup.string().nullable().default('pending'),
});

module.exports = (db) =>
  new Entity({
    client: db.client,
    modelName: 'Offer',
    tableName: 'Offers',
    yupScheme: offerScheme,
  }, db);
