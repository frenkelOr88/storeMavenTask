/* eslint-disable func-names, no-console */

const fs = require('fs');
const path = require('path');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function () {};

exports.up = function (db) {
  const filePath = path.join(__dirname, 'sqls', '20211001124713-create-tables.sql');
  return new Promise(((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  }))
    .then(data => db.runSql(data));
};


exports._meta = {
  version: 1,
};
