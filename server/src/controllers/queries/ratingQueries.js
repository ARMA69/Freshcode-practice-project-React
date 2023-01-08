// const bd = require('../../models');
const dbClient = require('../../jsonDB');
const ServerError = require('../../errors/ServerError');

module.exports.updateRating = async (data, predicate, transaction) => {
  // const [updatedCount, [updatedRating]] = await bd.Ratings.update(data,
  //   { where: predicate, returning: true, transaction });

  const [updatedCount, [updatedRating]] = await dbClient.Ratings.update(data,
    { where: predicate });

  if (updatedCount !== 1) {
    throw new ServerError('cannot update mark on this offer');
  }
  // return updatedRating.dataValues;
  return updatedRating;
};

module.exports.createRating = async (data, transaction) => {
  // const result = await bd.Ratings.create(data, { transaction });

  const result = await dbClient.Ratings.create(data);

  if (!result) {
    throw new ServerError('cannot mark offer');
  } else {
    // return result.get({ plain: true });
    return result;
  }
};

