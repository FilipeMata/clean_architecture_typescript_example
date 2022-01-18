const { exec } = require("child_process");
const databases = require('../src/infrastructure/db/databases.json');

const createDatabases = async () => {
  const schemas = Object.keys(databases);
  
  for (const schema of schemas) {
    await exec(`docker exec dbmysql mysql -u ${databases[schema].username} -p${databases[schema].password} -e "create database if not exists ${schema};"`);
  }
}
createDatabases();