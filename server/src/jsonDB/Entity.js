const { JsonDB } = require('node-json-db');
const uuid = require('uuid');
const yup = require('yup');

const customValidations = [
  { name: 'uniqueValidation', method: 'unique', defaultParam: { message: 'Unique constraint error' } },
  { name: 'primaryKeyValidation', method: 'primaryKey', defaultParam: { message: 'Value violates primary key constraint' } },
  { name: 'autogenerate', method: 'autogenerate', defaultParam: { message: null } },
  { name: 'foreignKeyValidation', method: 'foreignKey', defaultParam: { message: 'Value violates foreign key constraint', references: { table: null, key: null } } },
];

customValidations.forEach((v) => {
  function handler (param = v.defaultParam) {
    this[v.name] = param;
    return this;
  };
  yup.addMethod(yup.number, v.method, handler);
  yup.addMethod(yup.string, v.method, handler);
});

class HttpError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

const constructorProps = yup.object().shape({
  client: yup.object().test('client_instance', 'client prop should be an instance of JsonDB', (value) => value instanceof JsonDB).required(),
  yupScheme: yup.object().test('yup_instance', 'yupScheme should be an instance of yup ObjectSchema shape', (value) => value instanceof yup.ObjectSchema).required(),
  modelName: yup.string().required(),
  tableName: yup.string().required(),
  timestamps: yup.boolean().optional(),
});

module.exports = class Entity {
  constructor(props, db) {
    constructorProps.validateSync(props);

    const {
      client: dbClient,
      modelName,
      tableName,
      yupScheme,
      timestamps,
    } = props;

    this.dbClient = dbClient;
    this.models = db;
    this.path = `/${tableName}`;
    try {
      this.dbClient.getData(this.path);
    } catch (error) {
      this.dbClient.push(this.path, []);
    }

    this.name = modelName;
    this.tableName = tableName;
    this.yupScheme = yupScheme;
    this.useTimestamps = Boolean(timestamps);

    customValidations.forEach((v) => {
      this[`${v.name}Fields`] = Object.entries(this.yupScheme.fields)
        .filter(([_field, schema]) => schema.hasOwnProperty(v.name))
        .reduce((acc, [field, schema]) => Object.assign({}, acc, { [field]: schema[v.name] }), {});
    });
  }

  async nextId() {
    this.dbClient.reload();
    const all = await this.findAll();
    let maxId = 0;
    all.forEach((v) => {
      if (v.id > maxId) maxId = v.id;
    });

    return maxId + 1;
  }

  async getRowsByPredicate(rows, predicate = {}) {
    const foundRows = predicate.where
      ? rows.filter((data) => {
          const verdicts = [];
          for (const key in predicate.where) {
            const comparedValue = predicate.where[key];

            if (Array.isArray(comparedValue)) {
              verdicts.push(comparedValue.some(v => data[key] === v));
            } else if (typeof comparedValue === 'function') {
              verdicts.push(comparedValue(data[key]));
            } else {
              if ((typeof data[key] === 'number' && typeof comparedValue === 'string') || (typeof data[key] === 'string' && typeof comparedValue === 'number')) {
                verdicts.push(data[key] == comparedValue);
              } else {
                verdicts.push(data[key] === comparedValue);
              }
            }
            
          }
          return verdicts.length && verdicts.every((v) => v === true);
        })
      : rows;

    // TODO order, offset, attributes, include, exclude

    return foundRows.slice(0, predicate.limit || foundRows.length);
  }

  async customYupValidation(data, validatorName, code = 400) {
    const test = async (data, validator) => {
      for (const field in this[`${validator}Fields`]) {
        if (data[field]) {
          const fieldValidation = this[`${validator}Fields`][field];

          if (validator === 'foreignKeyValidation') {
            const fk = fieldValidation;
            if (fk.references.table && fk.references.key) {
              const foreignTable = this.models[fk.references.table];
              if (!foreignTable || !foreignTable?.yupScheme?.fields?.[fk.references.key]) {
                throw new Error(`Cannot satisfy foreignKey constraint in model ${this.name} field '${field}' to table ${fk.references.table}(column ${fk.references.key})`);
              }
    
              const found = foreignTable.findOne({ where: { [field]: data[field] } });
              if (!found) {
                throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} in table '${this.name}' violates foreign key constraint "${this.name}_${field}_fk" on table ${foreignTable}`);
              }
            } else {
              throw new Error(`Foreign key of model ${this.name} field ${field} should have references option`);
            }
          } else if (validator === 'primaryKeyValidation') {
            const pkValues = {};
            for (const key in this[`${validator}Fields`]) {
              if (data[key]) {
                pkValues[key] = data[key];
              }
            }
            const found = await this.findOne({ where: pkValues });
            if (found) {
              throw new HttpError(code, typeof fieldValidation === 'string' ? fieldValidation : fieldValidation.message);
            }
          } else {
            const found = await this.findOne({ where: { [field]: data[field] } });
            if (found) {
              throw new HttpError(code, typeof fieldValidation === 'string' ? fieldValidation : fieldValidation.message);
            }
          }
        }
      }
    }

    if (this.yupScheme) {
      if (typeof validatorName === 'string') {
        await test(data, validatorName);
      } else if (Array.isArray(validatorName)) {
        for (const validator of validatorName) {
          await test(data, validator);
        }
      }
    }
  }

  async yupValidateData(data) {
    // TODO more testing
    try {
      if (this.yupScheme) {
        await this.yupScheme.validate(data, { strict: true });
      }
    } catch (error) {
      throw new HttpError(400, error.message);
    }
  }

  async saveRows(table) {
    this.dbClient.push(this.path, table);
    this.dbClient.save();
  }

  async mergeRows(oldData, newData, options = { type: 'none' }) {
    const defaults = await this.yupScheme?.default();
    const timestamps =
      this.useTimestamps
      ? {
          createdAt:
            options.type === 'create'
            ? new Date().toJSON()
            : oldData.createdAt,
          updatedAt: new Date().toJSON(),
        }
      : {};

    return Object.assign({}, defaults, oldData, timestamps, await this.yupScheme.cast(newData));
  }

  async generatePrimaryKeys() {
    const primaryKeys = {};
    for (const field in this.autogenerateFields) {
      const generate = this.autogenerateFields[field];
      let value;
      if (typeof generate === 'function') {
        value = await generate();
      } else if (generate === 'increment') {
        value = await this.nextId();
      } else if (generate === 'uuid') {
        value = uuid.v4();
      }
      value && Object.assign(primaryKeys, { [field]: value });
    }
    return primaryKeys;
  }

  async checkForeignReferences(newData, type) {
    if (type === 'create' || type === 'update') {
      Object.entries(this.foreignKeyValidationFields)
      .forEach(([field, fk]) => {
        if (fk.references.table && fk.references.key) {
          const foreignTable = this.models[fk.references.table];
          if (!foreignTable || !foreignTable?.yupScheme?.fields?.[fk.references.key]) {
            throw new Error(`Cannot satisfy foreignKey constraint in model ${this.name} field '${field}' to table ${fk.references.table}(column ${fk.references.key})`);
          }

          const found = foreignTable.findOne({ where: { [field]: newData[field] } });
          if (!found) {
            throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} in table '${this.name}' violates foreign key constraint "${this.name}_${field}_fk" on table ${foreignTable}`);
          }
        } else {
          throw new Error(`Foreign key of model ${this.name} field ${field} should have references option`);
        }
      });
    }
  }

  /**
   * @param {object} data
   * @returns {Promise<object} created row of entity model
   */
  async create(data) {
    const existingData = await this.findAll();

    await this.customYupValidation(
      data,
      ['uniqueValidation', 'primaryKeyValidation'],
      409
    );
    await this.customYupValidation(data, 'foreignKeyValidation', 404);

    const pks = await this.generatePrimaryKeys();
    const newRow = await this.mergeRows(pks, data, { type: 'create' });
    await this.yupValidateData(newRow);

    existingData.push(newRow);
    await this.saveRows(existingData);
    return newRow;
  }

  /**
   * @param {object[]} data
   * @returns {Promise<object[]>} created rows of entity model
   */
  async bulkCreate(data) {
    if (!Array.isArray(data)) {
      throw new Error('Bulk create param should be an Array');
    }
    const existingData = await this.findAll();

    for (const row of data) {

      await this.customYupValidation(
        row,
        ['uniqueValidation', 'primaryKeyValidation'],
        409
      );
      await this.customYupValidation(row, 'foreignKeyValidation', 404);
  
      const pks = await this.generatePrimaryKeys();
      const newRow = await this.mergeRows(pks, row, { type: 'create' });
      await this.yupValidateData(newRow);

      existingData.push(newRow);
      await this.saveRows(existingData);
    }

    return existingData;
  }

  /**
   * @param {number | string} pk
   * @returns {Promise<object>} row of entity model
   */
  async findByPk(pk) {
    const existingData = await this.findAll();
    const foundData =
      existingData.find(await this.byPkPredicate.call(this, pk)) || null;

    // TODO conversions to column types
    return foundData;
  }

  /**
   * @param {object} predicate
   * @param {object | undefined} predicate.where
   * @param {number | undefined} predicate.limit
   * @returns {Promise<object[]>} rows of entity model
   */
  async findAll(predicate) {
    this.dbClient.reload();
    const existingData = this.dbClient.getData(this.path);

    const newArray = await this.getRowsByPredicate(existingData, predicate);

    // TODO conversions to column types

    return newArray;
  }

  /**
   * @param {object} predicate
   * @param {object | undefined} predicate.where
   * @returns {Promise<object>} row of entity model
   */
  async findOne(predicate) {
    if (!predicate.where) {
      throw new Error('Where predicate not found');
    }

    const existingData = await this.findAll();
    const found = await this.getRowsByPredicate(existingData, Object.assign({}, predicate, { limit: 1 }));

    if (!found.length) {
      return null;
    }

    // TODO conversions to column types

    return found[0];
  }

  /**
   * @param {object} data
   * @param {object} predicate
   * @param {object | undefined} predicate.where
   * @param {number | undefined} predicate.limit
   * @returns {Promise<[number, object[]]]>} updated count and rows of entity model
   */
  async update(data, predicate) {
    if (predicate && !predicate.where && !predicate.limit) {
      throw new Error('Where or limit predicate not found');
    }

    const existingData = await this.findAll();

    await this.customYupValidation(
      data,
      ['uniqueValidation', 'primaryKeyValidation'],
      409
    );
    await this.customYupValidation(data, 'foreignKeyValidation', 404);

    const foundRows = await this.getRowsByPredicate(existingData, predicate);
    const updatedRows = [];
    for (const row of foundRows) {
      // check data
      const newData = await this.mergeRows(row, data, { type: 'update' });
      await this.yupValidateData(newData);

      // write data
      Object.assign(row, newData);
      updatedRows.push(newData);
    }

    const count = updatedRows.length;

    await this.saveRows(existingData);
    return [count, updatedRows];
  }

  byPkPredicate(pkValue) {
    return (row) => {
      return Object.keys(this.primaryKeyValidationFields)
        .some(primaryKey => row[primaryKey] === pkValue);
    };
  }

  /**
   * @param {number | string} pk
   * @param {object} data
   * @returns {Promise<object>} updated row of entity model
   */
  async updateByPk(pk, data) {
    const existingData = await this.findAll();

    await this.customYupValidation(
      data,
      ['uniqueValidation', 'primaryKeyValidation'],
      409
    );
    await this.customYupValidation(data, 'foreignKeyValidation', 404);

    const foundIndex = existingData.findIndex(this.byPkPredicate.call(this, pk));
    if(foundIndex === -1) {
      return null;
    }

    const foundRow = existingData[foundIndex];
    const newData = await this.mergeRows(foundRow, data, { type: 'update' });
    await this.yupValidateData(newData);

    Object.assign(foundRow, newData);

    await this.saveRows(existingData);
    return newData;
  }
};
