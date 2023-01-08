// const bd = require('../../models');
const dbClient = require('../../jsonDB');
const ServerError = require('../../errors/ServerError');

module.exports.updateContest = async (data, predicate, transaction) => {
  // const [updatedCount, [updatedContest]] = await bd.Contests.update(data,
  //   { where: predicate, returning: true, transaction });

  const [updatedCount, [updatedContest]] = await dbClient.Contests.update(data,
    { where: predicate });

  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  } else {
    // return updatedContest.dataValues;
    return updatedContest;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  // const updateResult = await bd.Contests.update(data,
  //   { where: predicate, returning: true, transaction });

  const updateResult = await dbClient.Contests.update(data,
    { where: predicate });

  if (updateResult[ 0 ] < 1) {
    throw new ServerError('cannot update Contest');
  } else {
    // return updateResult[ 1 ][ 0 ].dataValues;
    return updateResult[ 1 ][ 0 ];
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  // const [updatedCount, [updatedOffer]] = await bd.Offers.update(data,
  //   { where: predicate, returning: true, transaction });

  const [updatedCount, [updatedOffer]] = await dbClient.Offers.update(data,
    { where: predicate });

  if (updatedCount !== 1) {
    throw new ServerError('cannot update offer!');
  } else {
    // return updatedOffer.dataValues;
    return updatedOffer;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  // const result = await bd.Offers.update(data,
  //   { where: predicate, returning: true, transaction });

  const result = await dbClient.Offers.update(data,
    { where: predicate });

  if (result[ 0 ] < 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return result[ 1 ];
  }
};

module.exports.createOffer = async (data) => {
  // const result = await bd.Offers.create(data);

  const result = await dbClient.Offers.create(data);

  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    // return result.get({ plain: true });
    return result;
  }
};
