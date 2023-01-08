const yup = require('yup');
const Entity = require('../Entity');

const userScheme = yup.object().shape({
  id: yup.number().integer().optional().min(0).primaryKey().autogenerate('increment'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  displayName: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required().unique('Such user already exists'),
  avatar: yup.string().default(() => 'anon.png').required(),
  role: yup.string().oneOf(['customer', 'creator']).required(),
  balance: yup.number().default(0).min(0).required(),
  accessToken: yup.string().optional().nullable().default(null),
  rating: yup.number().default(0).required(),
});

module.exports = (db) =>
  new Entity({
    client: db.client,
    modelName: 'User',
    tableName: 'Users',
    yupScheme: userScheme,
  }, db);
