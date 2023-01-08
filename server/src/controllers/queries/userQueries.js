// const bd = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const dbClient = require('../../jsonDB');

module.exports.updateUser = async (data, userId, transaction) => {
  // const [updatedCount, [updatedUser]] = await bd.Users.update(data,
  //   { where: { id: userId }, returning: true, transaction });

  const [updatedCount, [updatedUser]] = await dbClient.Users.update(data,
    { where: { id: userId }, limit: 1 });

  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }

  // return updatedUser.dataValues;
  return updatedUser;
};

module.exports.findUser = async (predicate = {}, transaction) => {
  // const result = await bd.Users.findOne({ where: predicate, transaction });

  const result = await dbClient.Users.findOne({ where: predicate });

  if (!result) {
    throw new NotFound('user with this data didn`t exist');
  } else {
    // return result.get({ plain: true });
    return result;
  }
};

module.exports.userCreation = async (data) => {
  // const newUser = await bd.Users.create(data);
  const newUser = await dbClient.Users.create(data);

  if (!newUser) {
    throw new ServerError('server error on user creation');
  } else {
    // return newUser.get({ plain: true });
    return newUser;
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new NotFound('Wrong password');
  }
};
