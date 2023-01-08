const { readdirSync } = require('fs');
const path = require('path');

function runSeeders(client) {
  const basename = path.basename(__filename);
  readdirSync(path.resolve(__dirname, './'))
    .filter((file) => {
      return file.indexOf('.') !== 0 && (file !== basename) && file.slice(-3) === '.js';
    })
    .forEach((file) => {
      try {
        client.getData('/seeders');
      } catch (error) {
        client.push('/seeders', []);
      } finally {
        const seeders = client.getData('/seeders') || [];
        if (seeders.indexOf(file) === -1) {
          require(path.join(__dirname, './', file));

          seeders.push(file);
          client.push('/seeders', seeders);
        }
      }
    });
}

module.exports = runSeeders;
