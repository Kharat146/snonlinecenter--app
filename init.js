// Generate the node config
const yaml = require("js-yaml");
const fs = require("fs");
const db = require("./api/services/dbConnector");
const logger = require("./api/services/logger");

module.exports = async () => {
  // set configs to globals
  try {
    console.log("Config loaded");
    const config = yaml.load(fs.readFileSync("./config.yaml", "utf8"));
    const app_config = yaml.load(
      fs.readFileSync("./api/config/app_config.yaml", "utf8")
    );
    globalThis["config"] = config;

    // globalThis["ROLES"] = app_config["APP_CONFIG"]["USER_ROLES"];
    // globalThis["APP_CONFIG"] = app_config["APP_CONFIG"];

    // load logger
    globalThis["logger"] = logger;

    globalThis["db"] = db;
    globalThis["errorMessages"] = JSON.parse(fs.readFileSync("./api/error/errors.json", "utf8"));
    // connecting to db
    console.log("DB loaded");
    
  } catch (e) {
    console.log(e);
  }
};