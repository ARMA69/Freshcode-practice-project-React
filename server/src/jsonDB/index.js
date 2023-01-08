const { readdirSync } = require('fs');
const path = require('path');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const config = require('../config/jsonDBConfig.json');
const mode = process.env.NODE_ENV || 'development';
const filePath = path.resolve(__dirname, config[mode].file);

const dbClient = new JsonDB(new Config(filePath, true, true, '/'));

try {
  dbClient.getData('/');
} catch (error) {
  throw new Error('cannot read json db');
}

const db = {};
db.client = dbClient;

readdirSync(path.resolve(__dirname, './models'))
  .filter((file) => {
    return (file.indexOf('.') !== 0) &&
      (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, './models', file))(db);
    db[ model.tableName ] = model;
  });

module.exports = db;
