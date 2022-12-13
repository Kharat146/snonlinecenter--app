"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
let dbconfig = require(__dirname + "/../config/config.json");
const yaml = require("js-yaml");
const configPath= path.join(__dirname+"../../../")
const config = yaml.load(fs.readFileSync(configPath+"config.yaml", "utf8"));
const { Umzug, SequelizeStorage } = require("umzug");
let db = {};
let sequelize;
try {
  if (config && config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    const SELECTED_DB_ENV = config.SELECTED_DB_ENV;
    dbconfig = dbconfig[SELECTED_DB_ENV][env]
    sequelize = new Sequelize(
      dbconfig.database,
      dbconfig.username,
      dbconfig.password,
      dbconfig
      );
    }
} catch (error) {
  console.log(error);
}

// this module use to migrate the DB
const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connection established...');
  })
  .catch((err) => {
    console.error("DB Authentication error: ", err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file != basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    db[modelName]["logger"] = function (log) {
      console.log("Query:: " + log);
    };
  }
});

// creating tables
// creating tables and if any new field added in between it will create 
// the field dynamically no need to write script to create or add a field
sequelize.sync({ force: false })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.umzug = umzug;
module.exports = db;
