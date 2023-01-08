// const bd = require('../../models');
const dbClient = require('../../jsonDB');
const BankDeclineError = require('../../errors/BankDeclineError');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  // const [updatedCount, [updatedBank]] = await bd.Banks.update(data,
  //   { where: predicate, returning: true, transaction });

  const [updatedCount, [updatedBank]] = await dbClient.Banks.update(data,
    { where: predicate });

  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
